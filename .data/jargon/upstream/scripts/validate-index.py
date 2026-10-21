#!/usr/bin/env python3
"""Validate legacy and progressive Feeling to Jargon indexes without loading the whole knowledge corpus."""
from __future__ import annotations
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def load(path: Path):
    with path.open(encoding="utf-8") as f:
        return json.load(f)

def assert_file(rel: str) -> dict:
    path = ROOT / rel
    assert path.is_file(), f"missing file: {rel}"
    return load(path)

root_doc = assert_file("index/root.json")
package_doc = assert_file("index/packages.json")
root = root_doc["domains"]
packages = package_doc["packages"]
root_ids = [item["domain_id"] for item in root]
package_ids = [item["domain_id"] for item in packages]
assert len(root_ids) == len(set(root_ids)), "duplicate root domain_id"
assert len([item["package_id"] for item in packages]) == len(set(item["package_id"] for item in packages)), "duplicate package_id"
assert set(root_ids) == set(package_ids), f"domain mismatch: roots={set(root_ids)-set(package_ids)}, packages={set(package_ids)-set(root_ids)}"
policy = root_doc["loading_policy"]
for key in ("max_subdomains", "max_intents", "max_leaf_packages", "max_entries_per_leaf", "route_score_margin", "high_confidence_score", "high_confidence_margin", "min_route_score"):
    assert isinstance(policy[key], int) and policy[key] > 0, f"invalid loading limit: {key}"
assert policy.get("max_intents_scope") == "per_subdomain", "intent limit scope must be per_subdomain"
for item in packages:
    term_path = ROOT / item["term_path"]
    assert term_path.is_file(), f"missing legacy term package: {item['term_path']}"
    term = load(term_path)
    assert term["package_id"] == item["package_id"], f"package id mismatch: {item['package_id']}"
    assert term["domain_id"] == item["domain_id"], f"domain id mismatch: {item['package_id']}"
    assert term["status"] == item["status"], f"status mismatch: {item['package_id']}"
    intent_ids = {intent["id"] for intent in term.get("intents", [])}
    assert set(item["intents"]) == intent_ids, f"intent mismatch: {item['package_id']}"

leaves_doc = assert_file("index/leaves.json")
runtime_doc = assert_file("index/runtime.json")
leaves = leaves_doc["leaves"]
routes = runtime_doc["routes"]
leaf_ids = [item["leaf_id"] for item in leaves]
assert leaf_ids and len(leaf_ids) == len(set(leaf_ids)), "duplicate or empty leaf_id"
assert len(routes) == len(leaf_ids), "runtime route count mismatch"
route_ids = {item["leaf_id"] for item in routes}
assert route_ids == set(leaf_ids), "runtime routes and leaf manifest differ"
leaf_by_id = {item["leaf_id"]: item for item in leaves}
intent_ids_by_subdomain = {}
intent_index_paths = set()
for domain in root:
    domain_doc = assert_file(domain["subdomain_index"])
    assert domain_doc["domain_id"] == domain["domain_id"], f"domain index mismatch: {domain['domain_id']}"
    subdomain_ids = {item["subdomain_id"] for item in domain_doc["subdomains"]}
    assert subdomain_ids, f"empty subdomain index: {domain['domain_id']}"
    for subdomain in domain_doc["subdomains"]:
        assert subdomain["intent_index"] not in intent_index_paths, f"duplicate intent index path: {subdomain['intent_index']}"
        intent_index_paths.add(subdomain["intent_index"])
        intent_doc = assert_file(subdomain["intent_index"])
        assert intent_doc["subdomain_id"] == subdomain["subdomain_id"], f"intent index mismatch: {subdomain['subdomain_id']}"
        assert intent_doc.get("domain_id") == domain["domain_id"], f"intent domain mismatch: {subdomain['subdomain_id']}"
        intent_ids_by_subdomain[(domain["domain_id"], subdomain["subdomain_id"])] = {
            intent["id"] for intent in intent_doc.get("intents", [])
        }
        intent_leaf_refs = {
            leaf_id
            for intent in intent_doc.get("intents", [])
            for leaf_id in intent.get("leaf_refs", [])
        }
        expected_leaf_refs = {
            leaf["leaf_id"]
            for leaf in leaves
            if leaf["domain_id"] == domain["domain_id"] and leaf["subdomain_id"] == subdomain["subdomain_id"]
        }
        assert intent_leaf_refs == expected_leaf_refs, f"intent leaf mismatch: {subdomain['subdomain_id']}"
for leaf in leaves:
    leaf_doc = assert_file(leaf["path"])
    assert leaf_doc["leaf_id"] == leaf["leaf_id"], f"leaf id mismatch: {leaf['leaf_id']}"
    assert leaf_doc["domain_id"] == leaf["domain_id"], f"leaf domain mismatch: {leaf['leaf_id']}"
    assert leaf_doc["subdomain_id"] == leaf["subdomain_id"], f"leaf subdomain mismatch: {leaf['leaf_id']}"
    assert leaf_doc["status"] == leaf["status"], f"leaf status mismatch: {leaf['leaf_id']}"
    assert leaf_doc["knowledge_type"] == leaf["knowledge_type"], f"knowledge type mismatch: {leaf['leaf_id']}"
    assert len(leaf_doc.get("entries", [])) == leaf["entry_count"], f"entry count mismatch: {leaf['leaf_id']}"
    entry_ids = [item["id"] for item in leaf_doc.get("entries", [])]
    assert len(entry_ids) == len(set(entry_ids)), f"duplicate entry id: {leaf['leaf_id']}"
    if leaf_doc.get("default_entry_id"):
        assert leaf_doc["default_entry_id"] in entry_ids, f"missing overview entry: {leaf['leaf_id']}"
    if leaf["scope"] == "provider-specific":
        assert leaf_doc.get("do_not_generalize") is True, f"provider leaf must be scoped: {leaf['leaf_id']}"
for route in routes:
    normalized_keywords = [unicodedata.normalize("NFKC", keyword).casefold().strip() for keyword in route["keywords"]]
    assert len(normalized_keywords) == len(set(normalized_keywords)), f"duplicate route keywords: {route['leaf_id']}"
    manifest = leaf_by_id[route["leaf_id"]]
    for field in ("title", "path", "domain_id", "subdomain_id", "knowledge_type", "entry_count", "scope", "intent_ids", "do_not_generalize", "provider"):
        assert route.get(field) == manifest.get(field), f"runtime metadata mismatch: {route['leaf_id']} field={field}"
    route_intents = set(route.get("intent_ids", []))
    known_intents = intent_ids_by_subdomain[(route["domain_id"], route["subdomain_id"])]
    assert route_intents <= known_intents, f"runtime intent mismatch: {route['leaf_id']}"
    assert route["keywords"], f"empty runtime keywords: {route['leaf_id']}"
print(f"index ok: {len(root)} domains, {len(packages)} legacy packages, {len(leaves)} progressive leaves, {len(routes)} runtime routes")
