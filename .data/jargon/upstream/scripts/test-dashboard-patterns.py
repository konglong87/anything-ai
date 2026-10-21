#!/usr/bin/env python3
"""E2E regression checks for consolidated Dashboard knowledge and entry budgets."""
from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

# Import the CLI for pure ranking checks without leaving bytecode artifacts.
sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
LAYOUT_LEAF_ID = "layout-patterns"
LAYOUT_PATH = "terms/dashboard/layout-patterns.json"
TEMPLATE_PATH = "templates/dashboard/dashboard-style-system.json"
FIELDS = {"layout", "termSkill", "uiSkill", "agentExec", "state", "tokens"}
EXPECTED_PATTERNS = {
    "多彩错列布局": "color-staggered-dashboard",
    "工业分区布局": "industrial-zones-dashboard",
    "中轴观测布局": "axial-observatory-dashboard",
    "玻璃点阵布局": "glass-dot-matrix-dashboard",
    "暖色三栏布局": "warm-three-column-dashboard",
}
NATURAL_QUERIES = {
    "非对称双列，容量圆点独立切换": "color-staggered-dashboard",
    "低库存筛选并选中物料联动补货卡": "industrial-zones-dashboard",
    "共享选中态与时间轴预览联动": "axial-observatory-dashboard",
    "点阵读数和月份指标联动": "glass-dot-matrix-dashboard",
    "卧室房间联动和模式单位同步": "warm-three-column-dashboard",
}


def load(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def query(text, *options):
    result = subprocess.check_output(
        [sys.executable, str(ROOT / "scripts/query-index.py"), text, *options], text=True,
    )
    return json.loads(result)


def json_snapshot(root):
    return {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in root.rglob("*.json")}


class DashboardPatternsTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.leaf = load(LAYOUT_PATH)
        cls.template = load(TEMPLATE_PATH)
        cls.entries = {item["id"]: item for item in cls.leaf["entries"]}
        cls.patterns = {key: cls.entries[key] for key in EXPECTED_PATTERNS.values()}
        spec = importlib.util.spec_from_file_location("query_index", ROOT / "scripts/query-index.py")
        cls.runtime = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.runtime)

    def test_variants_share_one_leaf_and_one_route(self):
        ids = set(EXPECTED_PATTERNS.values())
        leaves = load("index/leaves.json")["leaves"]
        routes = load("index/runtime.json")["routes"]
        self.assertTrue(ids.isdisjoint(item["leaf_id"] for item in leaves))
        self.assertEqual(sum(item["leaf_id"] == LAYOUT_LEAF_ID for item in routes), 1)
        self.assertEqual(self.leaf["default_entry_id"], LAYOUT_LEAF_ID)
        refs = self.template["pattern_refs"]
        self.assertEqual({ref["entry_id"] for ref in refs}, set(self.patterns))
        self.assertEqual(len(refs), len(self.patterns))
        for ref in refs:
            self.assertEqual(ref["path"], LAYOUT_PATH)
            self.assertEqual(ref["status"], self.entries[ref["entry_id"]]["evidence"]["status"])

    def test_titles_ids_and_natural_queries_are_reachable_under_budget(self):
        queries = {**EXPECTED_PATTERNS, **NATURAL_QUERIES,
                   **{key: key for key in EXPECTED_PATTERNS.values()}}
        for text, expected in queries.items():
            for options in [(), ("--max-entries", "1", "--max-leaves", "1")]:
                with self.subTest(query=text, options=options):
                    result = query(text, *options)
                    self.assertEqual(result["matches"][0]["leaf_id"], LAYOUT_LEAF_ID)
                    self.assertEqual([entry["id"] for entry in result["matches"][0]["entries"]], [expected])
                    self.assertLessEqual(result["trace"]["loaded_leaf_count"], 2)
                    self.assertEqual(result["network_search"], "not_requested")

    def test_shared_contract_and_state_references(self):
        self.assertEqual(set(self.template["field_contract"]), FIELDS)
        for item in self.patterns.values():
            with self.subTest(entry=item["id"]):
                self.assertTrue(FIELDS.issubset(item))
                self.assertEqual(item["contract_ref"], TEMPLATE_PATH)
                self.assertEqual(item["tokens"]["scope"], "provided_example")
                self.assertEqual(item["state"]["model_status"], "proposed_implementation")
                self.assertTrue(item["state"]["invariants"])
                state = item["state"]
                source = set(state["source"])
                derived = set(state["derived"])
                self.assertTrue(source.isdisjoint(derived))
                for action in item["agentExec"]:
                    writes = set(action.get("writes", []))
                    preserves = set(action.get("preserves", []))
                    self.assertTrue(writes <= source)
                    self.assertTrue(preserves <= source | derived)
                    self.assertTrue(writes.isdisjoint(preserves))
                    self.assertTrue(set(action.get("updates", [])) <= source | derived)

    def test_original_parameters_and_independent_state_are_preserved(self):
        color = self.patterns["color-staggered-dashboard"]
        self.assertEqual(color["tokens"]["values"]["grid_ratio"], [1.42, 1])
        self.assertEqual(color["tokens"]["values"]["radius_px"], 26)
        self.assertEqual(color["agentExec"][0]["preserves"], ["capacitySelection"])
        industrial = self.patterns["industrial-zones-dashboard"]
        self.assertEqual(industrial["agentExec"][0]["sets"], {"stockFilter": 2})
        self.assertEqual(industrial["agentExec"][2]["example_transition"], {"before": 7, "after": 8})
        self.assertEqual(industrial["state"]["derived"]["replenishmentCount"], "count(replenishmentItems)")
        observatory = self.patterns["axial-observatory-dashboard"]
        self.assertEqual(set(observatory["agentExec"][1]["updates"]), {"queueSelection", "readings", "starMap", "curve"})
        glass = self.patterns["glass-dot-matrix-dashboard"]
        self.assertEqual(glass["agentExec"][1]["example_values"], {"selectedMonth": 8, "selectedMetric": "score"})
        self.assertEqual(glass["agentExec"][2]["preserves"], ["selectedMonth"])

    def test_unconfirmed_execution_is_not_presented_as_complete(self):
        warm = self.patterns["warm-three-column-dashboard"]
        self.assertEqual(warm["evidence"]["status"], "needs_confirmation")
        self.assertEqual(warm["evidence"]["confirmed_layers"], ["layout", "termSkill", "uiSkill"])
        self.assertTrue(warm["evidence"]["missing_inputs"])
        for action in warm["agentExec"]:
            self.assertEqual(action["status"], "needs_confirmation")
        gaps = {item["slot"]: item for item in self.template["source_gaps"]}
        self.assertEqual(gaps[5]["status"], "needs_confirmation")
        self.assertEqual(gaps[6]["status"], "missing")
        self.assertNotIn("entry_id", gaps[6])
        self.assertEqual(len(self.patterns), 5)

    def test_entry_ranking_precedes_limit_and_preserves_legacy_fallback(self):
        entries = [{"id": "overview", "name": "概览"}, {"id": "target", "name": "工业分区布局"}]
        selected = self.runtime.select_entries("工业分区布局", entries, 1, 2)
        self.assertEqual(selected, [entries[1]])
        self.assertEqual(self.runtime.select_entries("unmatched", entries, 2, 2), entries)
        self.assertEqual(self.runtime.select_entries("unmatched", entries, 2, 2, "overview"), [entries[0]])
        self.assertEqual(self.runtime.select_entries("unmatched", [], 1, 2), [])

    def test_generic_query_uses_overview_without_dumping_variants(self):
        result = query("设计一个不模板化的 AI 数据后台")
        layout = next(item for item in result["matches"] if item["leaf_id"] == LAYOUT_LEAF_ID)
        self.assertEqual([item["id"] for item in layout["entries"]], [LAYOUT_LEAF_ID])
        self.assertIn("minimal-data", [item["leaf_id"] for item in result["matches"]])

    def test_combined_request_keeps_both_named_variants(self):
        result = query("比较工业分区布局与暖色三栏布局", "--max-entries", "2")
        layout = next(item for item in result["matches"] if item["leaf_id"] == LAYOUT_LEAF_ID)
        self.assertEqual({item["id"] for item in layout["entries"]},
                         {"industrial-zones-dashboard", "warm-three-column-dashboard"})

    def test_unrelated_queries_do_not_load_dashboard_family(self):
        for text in ["普通卡片轮播", "保存按钮变进度环", "GSAP timeline", "hello world"]:
            with self.subTest(query=text):
                result = query(text)
                self.assertNotIn(LAYOUT_LEAF_ID, [item["leaf_id"] for item in result["matches"]])

    def test_regeneration_keeps_authored_content_and_is_idempotent(self):
        with tempfile.TemporaryDirectory(prefix="dashboard-regression-") as folder:
            target = Path(folder)
            for name in ("scripts", "terms", "templates", "index"):
                shutil.copytree(ROOT / name, target / name, ignore=shutil.ignore_patterns("__pycache__"))
            authored = target / LAYOUT_PATH
            document = json.loads(authored.read_text())
            document["entries"][-1]["aliases"].append("专属三栏回归别名")
            authored.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n")
            original = authored.read_bytes()
            command = [sys.executable, str(target / "scripts/bootstrap-progressive-content.py")]
            subprocess.run(command, check=True, capture_output=True)
            first = json_snapshot(target)
            subprocess.run(command, check=True, capture_output=True)
            self.assertEqual(first, json_snapshot(target))
            self.assertEqual(original, authored.read_bytes())
            self.assertEqual(len(json.loads((target / "index/leaves.json").read_text())["leaves"]),
                             len(load("index/leaves.json")["leaves"]))
            template = json.loads((target / TEMPLATE_PATH).read_text())
            self.assertEqual({item["entry_id"] for item in template["pattern_refs"]}, set(self.patterns))
            result = json.loads(subprocess.check_output(
                [sys.executable, str(target / "scripts/query-index.py"), "专属三栏回归别名", "--max-entries", "1"], text=True))
            self.assertEqual(result["matches"][0]["entries"][0]["id"], "warm-three-column-dashboard")


if __name__ == "__main__":
    unittest.main()
