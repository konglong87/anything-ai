#!/usr/bin/env python3
"""End-to-end checks for progressive routing scenarios."""
from __future__ import annotations
import json
import subprocess
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUERY = ROOT / "scripts/query-index.py"
CASES = [
    ("删除列表项，5 秒内撤销并支持键盘", {"undo-window", "motion-accessibility"}, 4),
    ("设计一个不模板化的 AI 数据后台", {"minimal-data", "layout-patterns"}, 8),
    ("把这个角色做成毛绒玩偶和周边", {"character-ip"}, 2),
    ("GPUIX 能不能跑移动端？", {"gpui-mobile"}, 3),
    ("后端需要高可用、高并发、高扩展", {"availability-patterns", "capacity-model", "scaling-strategies"}, 3),
    ("搜索框展开后自动聚焦，状态切换要连续", {"search-expand"}, 8),
    ("按住按钮确认危险操作，未满松手要取消", {"press-and-hold-confirm"}, 8),
    ("做一个前后对比滑块，支持键盘调整", {"before-after-slider"}, 8),
    ("设计一个克制的暗色 Dashboard，用明度分层", {"tonal-dark-dashboard"}, 8),
    ("实现液态玻璃导航并提供移动端降级", {"liquid-glass-bar"}, 8),
    ("用 GSAP 做 React ScrollTrigger，并正确清理", {"gsap-scrolltrigger", "gsap-react-lifecycle"}, 8),
    ("设计一个有 Light/Dark 预览的设计系统", {"living-style-guide-preview"}, 8),
    ("勾选后让顶部背景、进度环和数字同步变化", {"checkbox-cascade"}, 5),
    ("做一个叠卡展开，关闭时沿原路径叠回", {"stack-card-expand"}, 5),
    ("卡片吸附后再逐段绘制时间线", {"snap-card-timeline"}, 8),
    ("卡片停稳后画时间线", {"snap-card-timeline"}, 8),
    ("做一个有惯性、回弹和刻度吸附的时间滚轮", {"inertial-wheel"}, 8),
    ("从点击位置开始圆形扩散完成页面转场", {"radial-reveal-transition"}, 5),
    ("撕线下拉打开面板，未达阈值回弹", {"damped-bottom-sheet"}, 5),
    ("保存按钮收缩成进度环，完成后变已保存", {"submit-state-machine"}, 5),
    ("做一个吸边悬浮球，释放后吸附左右边缘", {"edge-docked-fab"}, 5),
    ("做一个三张卡片层叠轮播，拖过阈值飞出", {"perspective-carousel"}, 5),
]
NEGATIVE_CASES = [
    ("hello world", {"morph-icon", "ripple-button", "liquid-slider"}),
    ("GPUIX mobile", {"morph-icon", "ripple-button", "liquid-slider"}),
    ("普通列表卡片", {"stack-card-expand", "snap-card-timeline", "inertial-wheel"}),
]

for query, expected, max_leaves in CASES:
    raw = subprocess.check_output(["python3", str(QUERY), query], text=True)
    result = json.loads(raw)
    loaded = {item["leaf_id"] for item in result["matches"]}
    assert expected.issubset(loaded), f"{query}: missing {expected - loaded}"
    assert result["trace"]["loaded_leaf_count"] <= max_leaves, f"{query}: loaded too much"
    assert result["trace"]["loaded_leaf_count"] <= 8, f"{query}: exceeds global cap"
    assert len(result["trace"]["selected_subdomains"]) <= 3, f"{query}: exceeds subdomain cap"
    assert result["trace"]["domain_index_paths"], f"{query}: domain index was not loaded"
    assert result["trace"]["intent_index_paths"], f"{query}: intent index was not loaded"
    subdomains = len(result["trace"]["selected_subdomains"])
    assert len(result["trace"]["selected_intents"]) <= 3 * subdomains, f"{query}: exceeds per-subdomain intent cap"
for query, forbidden in NEGATIVE_CASES:
    raw = subprocess.check_output(["python3", str(QUERY), query], text=True)
    result = json.loads(raw)
    loaded = {item["leaf_id"] for item in result["matches"]}
    assert loaded.isdisjoint(forbidden), f"{query}: false positive {loaded & forbidden}"
raw = subprocess.check_output(["python3", str(QUERY), "GPUIX 能不能跑移动端？"], text=True)
gpui_result = json.loads(raw)
gpui_mobile = next(item for item in gpui_result["matches"] if item["leaf_id"] == "gpui-mobile")
assert gpui_mobile["scope"] == "provider-specific", "provider scope was lost"
assert gpui_mobile["do_not_generalize"] is True, "provider boundary was lost"

raw = subprocess.check_output(["python3", str(QUERY), "实现液态玻璃导航并提供移动端降级"], text=True)
glass_result = json.loads(raw)
glass = next(item for item in glass_result["matches"] if item["leaf_id"] == "liquid-glass-bar")
glass_entry = glass["entries"][0]
for field in ("performance_budget", "fallback", "mobile_degradation", "reduced_motion"):
    assert field in glass_entry and glass_entry[field], f"visual effect field missing: {field}"

raw = subprocess.check_output(["python3", str(QUERY), "用 GSAP 做 React ScrollTrigger，并正确清理"], text=True)
gsap_result = json.loads(raw)
gsap = next(item for item in gsap_result["matches"] if item["leaf_id"] == "gsap-scrolltrigger")
assert gsap["scope"] == "provider-specific", "GSAP provider scope was lost"
assert gsap["do_not_generalize"] is True, "GSAP generalization boundary was lost"
assert gsap["entries"][0]["verification_required"] is True, "GSAP verification flag was lost"

raw = subprocess.check_output(["python3", str(QUERY), "设计一个有 Light/Dark 预览的设计系统"], text=True)
design_system_result = json.loads(raw)
design_system = next(item for item in design_system_result["matches"] if item["leaf_id"] == "living-style-guide-preview")
assert design_system["entries"][0]["verification_required"] is True, "design system verification flag was lost"
assert design_system["entries"][0]["external_references"], "design system external reference missing"

raw = subprocess.check_output(["python3", str(QUERY), "GSAP timeline"], text=True)
gsap_timeline_result = json.loads(raw)
assert gsap_timeline_result["matches"][0]["leaf_id"] == "gsap-timeline", "specific GSAP query lost top match"
assert gsap_timeline_result["trace"]["loaded_leaf_count"] <= 2, "specific GSAP query loaded unrelated leaves"

for query, forbidden in [("React", {"gsap-react-lifecycle"}), ("React动画", {"gsap-react-lifecycle"})]:
    result = json.loads(subprocess.check_output(["python3", str(QUERY), query], text=True))
    loaded = {item["leaf_id"] for item in result["matches"]}
    assert loaded.isdisjoint(forbidden), f"{query}: provider-specific false positive"

for query, expected in [
    ("availability-patterns", "availability-patterns"),
    ("capacity-model", "capacity-model"),
    ("scaling-strategies", "scaling-strategies"),
]:
    result = json.loads(subprocess.check_output(["python3", str(QUERY), query], text=True))
    assert result["matches"] and result["matches"][0]["leaf_id"] == expected, f"{query}: canonical route lookup failed"

for query, expected_top in [
    ("勾选联动", "checkbox-cascade"),
    ("叠卡展开", "stack-card-expand"),
    ("卡片停稳后画时间线", "snap-card-timeline"),
    ("惯性滚轮", "inertial-wheel"),
    ("圆形扩散转场", "radial-reveal-transition"),
    ("撕线弹出面板", "damped-bottom-sheet"),
    ("保存按钮变进度环", "submit-state-machine"),
    ("吸边悬浮球", "edge-docked-fab"),
    ("卡片层叠轮播", "perspective-carousel"),
]:
    result = json.loads(subprocess.check_output(["python3", str(QUERY), query], text=True))
    assert result["matches"][0]["leaf_id"] == expected_top, f"{query}: wrong top match"

for query, leaf_id, entry_id, required_fields in [
    ("勾选后让顶部背景、进度环和数字同步变化", "checkbox-cascade", "checkbox-cascade", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
    ("做一个叠卡展开，关闭时沿原路径叠回", "stack-card-expand", "stack-card-expand", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
    ("卡片吸附后再逐段绘制时间线", "snap-card-timeline", "snap-card-timeline", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
    ("做一个有惯性、回弹和刻度吸附的时间滚轮", "inertial-wheel", "inertial-wheel", ("state_machine", "accessibility", "acceptance")),
    ("从点击位置开始圆形扩散完成页面转场", "radial-reveal-transition", "radial-reveal-transition", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
    ("撕线下拉打开面板，未达阈值回弹", "damped-bottom-sheet", "tear-line-panel", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
    ("保存按钮收缩成进度环，完成后变已保存", "submit-state-machine", "save-progress-ring", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
    ("做一个吸边悬浮球，释放后吸附左右边缘", "edge-docked-fab", "edge-docked-fab", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
    ("做一个三张卡片层叠轮播，拖过阈值飞出", "perspective-carousel", "stacked-card-carousel", ("state_machine", "animation_sequence", "spatial_anchor", "acceptance")),
]:
    result = json.loads(subprocess.check_output(["python3", str(QUERY), query], text=True))
    leaf = next(item for item in result["matches"] if item["leaf_id"] == leaf_id)
    entry = next(item for item in leaf["entries"] if item["id"] == entry_id)
    for field in required_fields:
        assert entry.get(field), f"{leaf_id}: missing {field}"

for option in ("--max-leaves", "--max-entries"):
    completed = subprocess.run(
        ["python3", str(QUERY), "撤销", option, "0"],
        text=True,
        capture_output=True,
    )
    assert completed.returncode != 0, f"{option}: zero must be rejected"
runtime_doc = json.loads((ROOT / "index/runtime.json").read_text(encoding="utf-8"))
for route in runtime_doc["routes"]:
    normalized_keywords = [unicodedata.normalize("NFKC", keyword).casefold().strip() for keyword in route["keywords"]]
    assert len(normalized_keywords) == len(set(normalized_keywords)), f"duplicate route keywords: {route['leaf_id']}"

# Every published leaf must remain addressable by its own title. This catches
# explicit alias lists that accidentally shadow or omit the canonical title.
for leaf in json.loads((ROOT / "index/leaves.json").read_text(encoding="utf-8"))["leaves"]:
    result = json.loads(subprocess.check_output(["python3", str(QUERY), leaf["title"]], text=True))
    assert result["matches"] and result["matches"][0]["leaf_id"] == leaf["leaf_id"], f"title route drift: {leaf['leaf_id']}"
subprocess.run([sys.executable, str(ROOT / "scripts/test-dashboard-patterns.py")], check=True)
print(f"progressive query ok: {len(CASES)} scenarios")
