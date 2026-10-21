#!/usr/bin/env python3
"""Progressively route a user query to the smallest useful Feeling to Jargon knowledge set."""
from __future__ import annotations
import argparse
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def load(rel: str):
    with (ROOT / rel).open(encoding="utf-8") as f:
        return json.load(f)

def normalize(value: str) -> str:
    return unicodedata.normalize("NFKC", value).lower().strip()

def chunks(value: str) -> list[str]:
    text = normalize(value)
    # Keep Chinese runs and latin/digit words; substring matching handles short Chinese phrases.
    return re.findall(r"[\u4e00-\u9fff]{2,}|[a-z0-9][a-z0-9+.#:/-]*", text)

def chinese_runs(value: str) -> list[str]:
    return re.findall(r"[\u4e00-\u9fff]{2,}", normalize(value))

def positive_int(value: str) -> int:
    parsed = int(value)
    if parsed <= 0:
        raise ValueError("must be a positive integer")
    return parsed

def unique_keywords(keywords: list[str]) -> list[str]:
    result = []
    seen = set()
    for keyword in keywords:
        normalized = normalize(keyword)
        if normalized not in seen:
            seen.add(normalized)
            result.append(keyword)
    return result

def score(query: str, keywords: list[str]) -> int:
    q = normalize(query)
    q_tokens = {
        token
        for token in chunks(q)
        if len(token) >= 3 or any("\u4e00" <= char <= "\u9fff" for char in token)
    }
    points = 0
    matched_bigrams: set[str] = set()
    matched_tokens: set[str] = set()
    for keyword in unique_keywords(keywords):
        candidate = normalize(keyword)
        if candidate in q and (len(candidate) >= 3 or any("\u4e00" <= char <= "\u9fff" for char in candidate)):
            points += 3
            continue
        # Chinese requests often contain a shorter phrase inside a descriptive
        # keyword (e.g. “高可用” inside “高可用模式”). Count each observed
        # bigram once per route so repeated aliases cannot inflate a score.
        for phrase in chinese_runs(candidate):
            if len(phrase) < 3:
                continue
            matched_indices = {
                index
                for index in range(0, len(phrase) - 1)
                if phrase[index : index + 2] in q
            }
            # A single shared pair such as “卡片” is too generic. Require
            # adjacent pairs from the same descriptive phrase, so the query
            # contains a continuous 3-character fragment rather than two
            # unrelated pairs scattered across the sentence.
            adjacent_indices = {
                index
                for index in matched_indices
                if index + 1 in matched_indices
            }
            if 0 in adjacent_indices:
                matched_bigrams.update(
                    phrase[index : index + 2]
                    for index in adjacent_indices
                )
        matched_tokens.update(token for token in q_tokens if token in candidate)
    return points + (2 * len(matched_bigrams)) + len(matched_tokens)

def select_entries(query: str, entries: list[dict], limit: int, margin: int, default_entry_id=None) -> list[dict]:
    """Rank inside a merged family before applying its entry budget."""
    ranked = []
    normalized_query = normalize(query)
    for position, item in enumerate(entries):
        identifiers = [item.get("id", ""), item.get("name", ""), *item.get("aliases", [])]
        identifiers = [value for value in identifiers if normalize(value)]
        exact = any(len(normalize(value)) >= 3 and normalize(value) in normalized_query for value in identifiers)
        details = [item.get("plain_language", ""), item.get("when_to_use", "")]
        item_score = score(query, identifiers) + score(query, [value for value in details if value])
        if exact or item_score:
            ranked.append((exact, item_score, position, item))
    if not ranked:
        # Families may name an overview; preserve other leaves' legacy fallback.
        if default_entry_id:
            return [item for item in entries if item["id"] == default_entry_id][:limit]
        return entries[:limit]
    ranked.sort(key=lambda item: (-item[0], -item[1], item[2]))
    if ranked[0][0]:
        selected = [item for item in ranked if item[0]]
    else:
        selected = [item for item in ranked if item[1] >= ranked[0][1] - margin]
    return [item[3] for item in selected[:limit]]

def main() -> None:
    parser = argparse.ArgumentParser(description="Progressive Feeling to Jargon runtime query")
    parser.add_argument("query", nargs="+", help="user request")
    parser.add_argument("--max-leaves", type=positive_int, default=None)
    parser.add_argument("--max-entries", type=positive_int, default=None)
    args = parser.parse_args()
    query = " ".join(args.query)
    root = load("index/root.json")
    runtime = load("index/runtime.json")
    limits = root["loading_policy"]
    min_route_score = limits.get("min_route_score", 1)
    max_leaves = args.max_leaves if args.max_leaves is not None else limits["max_leaf_packages"]
    max_entries = args.max_entries if args.max_entries is not None else limits["max_entries_per_leaf"]

    ranked = []
    for route in runtime["routes"]:
        provider = normalize(route.get("provider") or "")
        if provider and provider not in normalize(query):
            continue
        route_score = score(query, route["keywords"])
        title = normalize(route.get("title") or "")
        if len(title) >= 3 and title in normalize(query):
            route_score += 2
        if route_score >= min_route_score:
            ranked.append((route_score, route))
    # A merged family must not lose routing priority just because it contains
    # more entries. Entry budgets are applied after within-family ranking.
    ranked.sort(key=lambda pair: (-pair[0], pair[1]["leaf_id"]))

    # Keep routes close to the best match within each selected subdomain. This
    # preserves one strong route per relevant subdomain while preventing a
    # specific request such as "GSAP timeline" from loading every leaf that
    # shares only the provider keyword.
    initial_selected = ranked[:max_leaves]
    selected_subdomains = []
    for _, route in initial_selected:
        key = (route["domain_id"], route["subdomain_id"])
        if key not in selected_subdomains:
            selected_subdomains.append(key)
    selected_subdomains = selected_subdomains[: limits["max_subdomains"]]
    default_margin = limits.get("route_score_margin", 0)
    high_confidence_score = limits.get("high_confidence_score", 0)
    high_confidence_margin = limits.get("high_confidence_margin", default_margin)
    selected = []
    for subdomain in selected_subdomains:
        subdomain_ranked = [
            pair for pair in ranked
            if (pair[1]["domain_id"], pair[1]["subdomain_id"]) == subdomain
        ]
        if not subdomain_ranked:
            continue
        top_score = subdomain_ranked[0][0]
        score_margin = high_confidence_margin if top_score >= high_confidence_score else default_margin
        selected.extend(
            pair for pair in subdomain_ranked
            if pair[0] >= max(1, top_score - score_margin)
        )
    selected = selected[:max_leaves]

    # Resolve the selected hierarchy before loading leaf content. The runtime
    # router stays small and hot, while these indexes provide the authoritative
    # domain -> subdomain -> intent path for the selected request.
    domain_index_paths = []
    intent_index_paths = []
    selected_intents = {}
    for domain_id, subdomain_id in selected_subdomains:
        domain_path = f"index/domains/{domain_id}.json"
        domain_doc = load(domain_path)
        domain_index_paths.append(domain_path)
        subdomain = next(item for item in domain_doc["subdomains"] if item["subdomain_id"] == subdomain_id)
        intent_doc = load(subdomain["intent_index"])
        intent_index_paths.append(subdomain["intent_index"])
        selected_intents[(domain_id, subdomain_id)] = {
            intent["id"] for intent in intent_doc.get("intents", [])
        }
    intent_rank = {}
    for route_score, route in selected:
        for intent_id in route.get("intent_ids", []):
            key = (route["domain_id"], route["subdomain_id"], intent_id)
            intent_rank[key] = max(route_score, intent_rank.get(key, 0))
    selected_intent_ids = set()
    for domain_id, subdomain_id in selected_subdomains:
        candidates = [
            (score_value, intent_id)
            for (candidate_domain, candidate_subdomain, intent_id), score_value in intent_rank.items()
            if candidate_domain == domain_id and candidate_subdomain == subdomain_id
        ]
        candidates.sort(key=lambda item: (-item[0], item[1]))
        selected_intent_ids.update(
            (domain_id, subdomain_id, intent_id)
            for _, intent_id in candidates[: limits["max_intents"]]
        )
    selected = [
        pair for pair in selected
        if any(
            (pair[1]["domain_id"], pair[1]["subdomain_id"], intent_id) in selected_intent_ids
            for intent_id in set(pair[1].get("intent_ids", []))
            & selected_intents[(pair[1]["domain_id"], pair[1]["subdomain_id"])]
        )
    ]

    loaded = []
    for route_score, route in selected:
        leaf = load(route["path"])
        terms = select_entries(
            query, leaf.get("entries", []), max_entries,
            limits["route_score_margin"], leaf.get("default_entry_id"),
        )
        loaded.append({
            "leaf_id": route["leaf_id"], "score": route_score, "knowledge_type": route["knowledge_type"],
            "scope": route["scope"], "do_not_generalize": route["do_not_generalize"],
            "path": route["path"], "entries": terms,
        })

    output = {
        "query": query,
        "strategy": "progressive",
        "trace": {
            "levels": ["root", "subdomain", "intent", "leaf", "entry"],
            "root_loaded": "index/root.json",
            "runtime_router_loaded": "index/runtime.json",
            "domain_index_paths": domain_index_paths,
            "intent_index_paths": intent_index_paths,
            "selected_intents": [
                {"domain_id": d, "subdomain_id": s, "intent_id": i}
                for d, s, i in sorted(selected_intent_ids)
            ],
            "selected_subdomains": [{"domain_id": d, "subdomain_id": s} for d, s in selected_subdomains],
            "loaded_leaf_paths": [item["path"] for item in loaded],
            "loaded_leaf_count": len(loaded),
            "entry_limit": max_entries,
        },
        "matches": loaded,
        "network_search": "not_requested",
    }
    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
