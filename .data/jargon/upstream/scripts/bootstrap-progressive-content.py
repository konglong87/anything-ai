#!/usr/bin/env python3
"""Create Feeling to Jargon progressive indexes and granular knowledge packages."""
from __future__ import annotations
import json
import argparse
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DASHBOARD_LAYOUT_LEAF_ID = "layout-patterns"
DASHBOARD_STYLE_TEMPLATE_PATH = "templates/dashboard/dashboard-style-system.json"

def normalize_keyword(value: str) -> str:
    return unicodedata.normalize("NFKC", value).casefold().strip()

PARSER = argparse.ArgumentParser(description="Bootstrap or refresh Feeling to Jargon progressive indexes")
PARSER.add_argument(
    "--force",
    action="store_true",
    help="regenerate existing leaf JSON from the embedded bootstrap catalog",
)
ARGS = PARSER.parse_args()

def dump(path: str, data: dict) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def read_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)

def adopt_existing_leaf(spec: dict) -> None:
    """Treat an existing leaf JSON as authored content unless --force is used."""
    target = ROOT / spec["path"]
    if not target.is_file() or ARGS.force is True:
        dump(spec["path"], {
            "schema_version": "1.0.0",
            **{key: value for key, value in spec.items() if key not in {"path", "entries"}},
            "entries": spec["entries"],
        })
        return
    existing = read_json(target)
    required = ("leaf_id", "domain_id", "subdomain_id", "title", "knowledge_type", "status", "intent_ids", "entries")
    missing = [key for key in required if key not in existing]
    if missing:
        raise ValueError(f"leaf {spec['path']} is missing required fields: {', '.join(missing)}")
    existing["path"] = spec["path"]
    existing.setdefault("scope", "general")
    existing.setdefault("do_not_generalize", False)
    spec.clear()
    spec.update(existing)

def discover_authored_leaves() -> None:
    """Include manually added granular leaves in the next generated index."""
    for path in sorted((ROOT / "terms").rglob("*.json")):
        relative = path.relative_to(ROOT).as_posix()
        if len(path.relative_to(ROOT / "terms").parts) == 1:
            continue
        data = read_json(path)
        leaf_id = data.get("leaf_id")
        if not leaf_id or leaf_id in leaf_defs:
            continue
        required = ("domain_id", "subdomain_id", "title", "knowledge_type", "status", "intent_ids", "entries")
        if all(key in data for key in required):
            data.setdefault("scope", "general")
            data.setdefault("do_not_generalize", False)
            leaf_defs[leaf_id] = {"path": relative, **data}

# Keep root/package indexes backward compatible while publishing the progressive loader policy.
root = json.loads((ROOT / "index/root.json").read_text(encoding="utf-8"))
root["schema_version"] = "2.0.0"
root["loading_policy"] = {
    "strategy": "progressive",
    "levels": ["root", "subdomain", "intent", "leaf", "entry"],
    "max_subdomains": 3,
    "max_intents": 3,
    "max_intents_scope": "per_subdomain",
    "max_leaf_packages": 8,
    "max_entries_per_leaf": 30,
    "route_score_margin": 2,
    "high_confidence_score": 6,
    "high_confidence_margin": 1,
    "min_route_score": 2,
    "search_fallback": "ask-before-network",
}
domain_specs = {
    "digital-product-uiux": [
        ("visual-layout", "视觉布局", "卡片、留白、非对称和出血布局"),
        ("design-tokens", "设计令牌", "颜色、字体、圆角、阴影和间距"),
        ("interaction-motion", "交互动效", "时间、速度、连续性和反馈"),
        ("continuous-interaction", "连续交互", "同一容器内的展开、形变、切换和回退"),
        ("gesture-interaction", "手势交互", "跟随、阈值、吸附和手势采样"),
        ("information-architecture", "信息架构", "导航、层级、密度和内容组织"),
        ("accessibility", "可访问性", "键盘、读屏、减少动态和状态表达"),
        ("dashboard-design", "Dashboard 设计", "数据后台的视觉方向和布局"),
        ("component-design", "组件设计", "可复用组件和 AI 组件描述"),
        ("visual-effects", "视觉效果", "玻璃、光晕、景深、卷收和液态粘连"),
        ("design-system", "设计系统", "设计令牌、预览和视觉验收"),
        ("animation-tool-adapter", "动画工具适配", "GSAP 等动画工具的实现边界"),
        ("3d-web-interface", "3D Web 界面", "实时 3D 和 GPU 视觉界面"),
    ],
    "ai-aigc-meta-skills": [
        ("image-prompt", "图像提示词", "主体、材质、光线和构图"),
        ("video-prompt", "视频提示词", "镜头、运动、声音和节奏"),
        ("character-ip", "角色 IP", "角色一致性、三视图和衍生物"),
        ("material-style", "材质与风格", "毛绒、PVC、纸张和渲染质感"),
        ("camera-language", "镜头语言", "景别、焦段、机位和运镜"),
        ("composition", "构图", "主体位置、留白和视觉动线"),
        ("motion-control", "运动控制", "动作、跟随、速度和镜头运动"),
        ("negative-prompt", "负面约束", "变形、漂移、重复和违规输出"),
        ("tool-adapter", "工具适配", "通用、Midjourney 和 Stable Diffusion 参数"),
    ],
    "software-engineering-architecture": [
        ("backend-architecture", "后端架构", "服务边界、状态和数据流"),
        ("high-availability", "高可用", "冗余、故障域、RTO 和 RPO"),
        ("high-concurrency", "高并发", "流量模型、延迟和资源隔离"),
        ("scalability", "高扩展", "水平扩展、分片、缓存和异步化"),
        ("observability", "可观测性", "SLI、SLO、日志、指标和追踪"),
        ("idempotency", "幂等", "操作身份、重试和重复请求"),
        ("frontend-platform", "前端平台", "组件、构建、运行时和交付"),
        ("desktop-web-mobile", "桌面 Web 移动端", "跨平台渲染与能力边界"),
    ],
    "workplace-communication": [
        ("vague-expression", "模糊表达", "把职场黑话翻译成可执行需求"),
        ("project-collaboration", "项目协作", "角色、依赖、风险和决策"),
        ("goal-alignment", "目标对齐", "目标、指标、范围和优先级"),
        ("execution-language", "执行语言", "下一步、负责人、截止时间和验收"),
        ("management-terms", "管理术语", "组织、机制、复盘和资源配置"),
    ],
}
# Small generic subdomain skeletons keep all roots progressively addressable without pretending coverage.
for domain in root["domains"]:
    domain_id = domain["domain_id"]
    domain_specs.setdefault(domain_id, [("core", "核心入口", "该领域的渐进式术语入口，内容持续扩充")])
for domain in root["domains"]:
    domain_id = domain["domain_id"]
    domain["subdomain_index"] = f"index/domains/{domain_id}.json"
    domain["loading_hint"] = "先匹配子域，再读取最小叶子包"
dump("index/root.json", root)

# Intent groups are deliberately small: they are a routing layer, not a knowledge dump.
intent_defaults = {
    "visual-layout": [("design-layout", "设计", "页面布局"), ("audit-layout", "评审", "布局问题")],
    "information-architecture": [("design-information", "设计", "信息架构"), ("audit-information", "评审", "信息层级")],
    "design-tokens": [("define-tokens", "定义", "设计令牌"), ("audit-tokens", "审计", "令牌一致性")],
    "interaction-motion": [("design-interaction", "设计", "交互动效"), ("implement-animation", "实现", "动画反馈"), ("audit-motion", "评审", "动效质量")],
    "continuous-interaction": [("design-continuous", "设计", "连续交互"), ("implement-continuous", "实现", "连续组件"), ("audit-continuous", "评审", "连续性")],
    "gesture-interaction": [("design-gesture", "设计", "手势交互"), ("implement-gesture", "实现", "手势组件"), ("audit-gesture", "评审", "手感问题")],
    "dashboard-design": [("design-dashboard", "设计", "数据后台"), ("audit-dashboard", "评审", "后台审美")],
    "component-design": [("generate-component", "生成", "UI 组件"), ("spec-component", "规范", "组件需求")],
    "visual-effects": [("design-visual-effect", "设计", "视觉效果"), ("implement-visual-effect", "实现", "视觉效果"), ("audit-performance", "评审", "视觉性能")],
    "design-system": [("build-design-system", "建立", "设计系统"), ("preview-design-system", "预览", "设计系统"), ("audit-design-system", "验收", "视觉规范")],
    "animation-tool-adapter": [("implement-gsap", "实现", "GSAP 动效"), ("audit-gsap", "评审", "GSAP 集成")],
    "3d-web-interface": [("compare-platform", "比较", "平台能力"), ("choose-renderer", "选择", "渲染后端")],
    "accessibility": [("audit-accessibility", "审计", "可访问性"), ("implement-accessibility", "实现", "无障碍能力")],
    "character-ip": [("generate-character", "生成", "角色 IP"), ("extend-character", "延展", "角色周边")],
    "image-prompt": [("write-image-prompt", "编写", "图像提示词"), ("audit-image-prompt", "检查", "图像提示词")],
    "video-prompt": [("write-video-prompt", "编写", "视频提示词"), ("audit-video-prompt", "检查", "视频提示词")],
    "material-style": [("write-image-prompt", "编写", "材质提示词")],
    "camera-language": [("write-image-prompt", "编写", "镜头语言"), ("write-video-prompt", "编写", "镜头语言")],
    "composition": [("write-image-prompt", "编写", "构图语言"), ("audit-image-prompt", "检查", "构图语言")],
    "motion-control": [("write-video-prompt", "编写", "运动控制")],
    "negative-prompt": [("write-image-prompt", "编写", "负面约束"), ("audit-image-prompt", "检查", "负面约束")],
    "tool-adapter": [("write-image-prompt", "编写", "工具适配"), ("write-video-prompt", "编写", "工具适配")],
    "backend-architecture": [("design-backend", "设计", "后端架构"), ("review-backend", "评审", "后端方案")],
    "high-availability": [("design-ha", "设计", "高可用"), ("audit-ha", "演练", "故障恢复")],
    "high-concurrency": [("model-capacity", "建模", "并发容量"), ("tune-performance", "优化", "性能")],
    "scalability": [("design-scale", "设计", "扩展策略"), ("plan-migration", "规划", "容量迁移")],
    "observability": [("define-slo", "定义", "SLO"), ("debug-production", "排障", "线上故障")],
    "idempotency": [("design-idempotency", "设计", "幂等契约"), ("diagnose-duplicate", "排查", "重复写入")],
    "frontend-platform": [("design-frontend", "设计", "前端平台"), ("audit-frontend", "评审", "前端平台")],
    "desktop-web-mobile": [("compare-platform", "比较", "平台能力"), ("choose-renderer", "选择", "渲染后端")],
    "vague-expression": [("clarify-vague", "澄清", "模糊表达"), ("rewrite-actionable", "改写", "可执行表达")],
    "project-collaboration": [("align-collaboration", "对齐", "项目协作"), ("resolve-dependency", "解决", "协作依赖")],
    "goal-alignment": [("define-goal", "定义", "目标"), ("review-priority", "评审", "优先级")],
    "execution-language": [("write-action", "编写", "执行项"), ("review-status", "复盘", "状态汇报")],
    "management-terms": [("explain-term", "解释", "管理术语"), ("translate-jargon", "翻译", "组织黑话")],
}

# Granular knowledge content. Every leaf is independently loadable.
leaf_defs = {}
def add_leaf(path, leaf_id, domain_id, subdomain_id, title, knowledge_type, entries, intent_ids=None, scope="general", extra=None):
    leaf_defs[leaf_id] = {
        "path": path,
        "leaf_id": leaf_id,
        "domain_id": domain_id,
        "subdomain_id": subdomain_id,
        "title": title,
        "knowledge_type": knowledge_type,
        "scope": scope,
        "status": "published",
        "intent_ids": intent_ids or [],
        "entries": entries,
        **(extra or {}),
    }

# Shared helpers.
def entry(eid, name, plain, when, params=None, related=None, constraints=None, aliases=None, **extra):
    result = {
        "id": eid, "name": name, "plain_language": plain, "when_to_use": when,
        "parameters": params or [], "related": related or [], "constraints": constraints or [], "aliases": aliases or []
    }
    result.update(extra)
    return result

interaction_dir = "terms/interaction"
add_leaf(f"{interaction_dir}/undo-window.json", "undo-window", "digital-product-uiux", "interaction-motion", "撤销时间窗口", "technique", [
    entry("undo-window", "可逆操作时间窗口", "删除后保留一段明确的可撤销时间，让用户有机会反悔。", "删除、归档、批量移除等可逆操作", ["窗口默认 5s；高风险操作 8–10s", "过期后按钮禁用并完成最终删除"], ["progress-feedback", "reverse-animation"], ["不要让过期后仍看起来可点击"]),
    entry("progress-feedback", "线性进度反馈", "进度条或进度环的完成时间与撤销窗口完全一致。", "需要让剩余时间可见", ["动画使用 linear", "数字可每秒更新，进度动画保持连续"], ["undo-window"], ["不能用缓动制造错误的剩余时间感"]),
    entry("pause-on-focus", "聚焦暂停窗口", "用户悬停或键盘聚焦撤销控件时暂停倒计时。", "误操作成本高且需要可访问性增强的场景", ["暂停状态必须可见", "失焦后继续倒计时"], ["accessibility"], ["不能无限暂停导致资源长期占用"]),
], ["design-interaction", "audit-motion"], extra={"loading_note": "撤销功能只需加载本叶子和反向动画，不加载全部动效"})
add_leaf(f"{interaction_dir}/reverse-animation.json", "reverse-animation", "digital-product-uiux", "interaction-motion", "撤销反向动画", "technique", [
    entry("reverse-path", "沿原路径反向归位", "撤销时沿删除动画的反方向回到原位置，而不是重新淡入。", "列表删除后恢复原项", ["删除缩小+位移+淡出，撤销放大+反向位移+淡入", "删除 200–300ms，撤销 180–240ms"], ["flip-reentry", "velocity-inheritance"], ["必须保留原索引、尺寸和位置上下文"]),
    entry("reentry-highlight", "归位确认高亮", "元素回到原位后增加短暂高亮或脉冲，确认它确实回来了。", "撤销后的状态需要被快速识别", ["高亮 500–700ms", "不改变布局"], ["reverse-path"], ["不要用强烈闪烁造成干扰"]),
    entry("reduced-motion", "减少动态降级", "减少动态时保留进度、状态和结果，不强制播放位移动画。", "用户开启 prefers-reduced-motion", ["保留明确状态变化", "取消复杂路径和粒子"], ["accessibility"], ["不可因为降级而丢失撤销入口"]),
], ["implement-animation", "audit-motion"])
add_leaf(f"{interaction_dir}/flip-reentry.json", "flip-reentry", "digital-product-uiux", "interaction-motion", "FLIP 反向归位", "technique", [
    entry("flip", "First Last Invert Play", "记录删除前后布局，撤销时把真实节点插回原索引，再播放反向变换。", "列表重排、共享元素和复杂布局撤销", ["First 记录原位置尺寸", "Last 记录重排后位置", "Invert 计算差值", "Play 播放反向变换"], ["reverse-path", "shared-element-transition"], ["节点已移除时保留 ghost/clone 或占位符"]),
    entry("placeholder", "占位与真实节点回插", "节点暂时移除后保留占位，撤销时按原索引插回真实节点。", "DOM 节点生命周期较短的列表", ["恢复原索引", "其他项让位动画"], ["flip"], ["不能把 ghost 当作最终业务节点"]),
], ["implement-animation"])
add_leaf(f"{interaction_dir}/accessibility.json", "motion-accessibility", "digital-product-uiux", "accessibility", "动效可访问性", "guideline", [
    entry("undo-aria", "撤销按钮可读标签", "按钮要读出操作和剩余时间，例如撤销删除，剩余 5 秒。", "撤销条、倒计时按钮", ["aria-label 动态更新", "键盘可聚焦和触发"], ["undo-window"], ["不要每秒通过 aria-live 播报倒计时"]),
    entry("undo-live", "轻量状态播报", "用 aria-live=polite 提示已删除、可撤销等关键状态。", "操作结果需要被读屏用户感知", ["只播报状态变化", "焦点不被撤销条抢走"], ["undo-aria"], ["不重复播报相同状态"]),
], ["audit-accessibility", "implement-accessibility"])

shared_entries = {
    "follow": [entry("follow", "跟随", "元素连续继承输入位置或速度，不瞬间跳到新状态。", "拖拽、滚动、转场和惯性动作", ["位置或速度 1:1 跟随", "必要时使用 lerp 或 spring 收敛"], ["threshold", "velocity-inheritance"], ["高频输入不能依赖昂贵布局重排"])],
    "threshold": [entry("threshold", "阈值", "达到位移、速度或双条件后才触发状态切换。", "半屏弹层、长按拖拽、粘连断开", ["明确位移阈值", "明确速度阈值", "可加入迟滞避免抖动"], ["snap", "follow"], ["不轻易触发，也不突然失效"])],
    "snap": [entry("snap", "吸附", "松手后把连续输入收敛到明确落点。", "滚轮、底部抽屉、滑块和拖拽", ["根据位置和速度选择锚点", "终点接管要平滑"], ["threshold", "velocity-inheritance"], ["不要硬跳到终点"])],
    "velocity-inheritance": [entry("velocity-inheritance", "速度继承", "松手后继续沿当前速度运动，再减速并吸附。", "惯性滚动、抽屉和抛物线飞入", ["保存释放瞬间速度", "设置 friction 和最大位移"], ["follow", "snap"], ["速度必须有上限，避免失控"])],
    "interruption": [entry("interruption", "可中断与恢复", "动画中途再次输入时接管当前状态，而不是等待旧动画结束。", "可拖拽、可快速连点或可反悔的组件", ["读取当前 transform", "取消旧动画并从当前状态继续"], ["follow", "reverse-animation"], ["不能产生双重回调或状态竞态"])],
}
for leaf_id, entries in shared_entries.items():
    add_leaf(f"{interaction_dir}/{leaf_id}.json", leaf_id, "digital-product-uiux", "gesture-interaction", entries[0]["name"], "principle", entries, ["design-gesture", "implement-gesture", "audit-gesture"])

interaction_12 = {
    "spring-press": ("Spring 按压回弹", "按下缩到 0.96–0.98，松手用弹簧回到 1 并允许 1.02–1.04 的轻微过冲。", ["scale 0.96–0.98", "overshoot 2%–4%", "可叠加内阴影或明度变化"]),
    "squash-toggle": ("Squash 弹性开关", "开关起步横向拉伸、纵向压缩，再回到正常比例。", ["scaleX 1.08", "scaleY 0.94", "180–240ms", "transform-origin 与方向一致"]),
    "ripple-button": ("Ripple 水波按钮", "从真实触点向最远角扩散水波，不把点击中心固定在控件中心。", ["400–600ms", "半径覆盖最远角", "移动端用 worklet/WXS 获取坐标"]),
    "burst-feedback": ("Burst 点击爆散", "关键点击用 6–12 个短寿命粒子表达完成或奖励。", ["寿命 300–500ms", "随机角度", "轻微重力", "只用于关键动作"]),
    "draw-success": ("Draw 成功勾选", "先画圆再画勾，用 SVG 描边过程表达成功。", ["stroke-dasharray", "stroke-dashoffset", "400–700ms"]),
    "liquid-slider": ("Liquid 液态滑块", "轨道、滑钮和数值使用同一弹簧同步变化。", ["同一 spring", "零延迟跟手", "轨道与数值同步"]),
    "count-animation": ("Count 数字滚动", "数字按位滚动并在最后一段明显减速。", ["tabular-nums", "cubic-bezier(0.16,1,0.3,1)", "固定宽度"]),
    "skeleton-shimmer": ("Shimmer 骨架落位", "骨架尺寸与真实内容一致，内容到达后平滑替换。", ["1.2–1.6s 循环", "高度、行高、间距一致"]),
    "card-flip": ("3D 卡片翻面", "正反面围绕同一中心翻转，保持透视和背面隐藏。", ["perspective 800–1200", "backface-visibility hidden", "iOS 加 webkit 前缀"]),
    "morph-icon": ("Morph 汉堡变叉", "使用同路径或线段位移旋转完成图标变形。", ["200–300ms", "同点数或明确线段映射"]),
    "stack-card": ("Stack 卡片抽走", "抽走前卡时露出后卡的缩放和位移层级。", ["scale 0.94/0.88", "translateY 8/16", "后卡必须露边"]),
    "bottom-sheet": ("阻尼弹性底部抽屉", "支持下拉、橡皮筋和多个锚点吸附。", ["closed/peek/half/full", "按位移+速度选锚点", "处理滚动穿透"]),
}
for leaf_id, (name, plain, params) in interaction_12.items():
    subdomain_id = "interaction-motion" if leaf_id != "bottom-sheet" else "gesture-interaction"
    intent_ids = ["design-interaction", "implement-animation"] if subdomain_id == "interaction-motion" else ["design-gesture", "implement-gesture"]
    add_leaf(f"{interaction_dir}/{leaf_id}.json", leaf_id, "digital-product-uiux", subdomain_id, name, "pattern", [entry(leaf_id, name, plain, "需要高级反馈但仍要保持可理解的操作结果", params, ["follow", "threshold", "snap", "interruption"])], intent_ids)

continuous_patterns = {
    "search-expand": ("搜索框展开", "图标与输入框共用容器，展开后自动聚焦，关闭时沿原路径收回。", ["transform-origin: left", "focus 延迟 80–120ms", "图标淡出", "关闭后焦点返回触发器"], ["idle", "expanded", "closing"], ["focus-continuity", "same-container-transition"]),
    "fab-panel-morph": ("加号展开面板", "FAB 原位形变为操作面板，中心点保持不变，关闭时逆向收回。", ["clip-path", "border-radius", "scale", "中心点不变"], ["closed", "opening", "open", "closing"], ["same-container-transition", "interruption"]),
    "submit-state-machine": ("提交状态反馈", "按钮容器固定，通过状态机切换 loading、success 和 result，避免按钮位移。", ["idle → loading → success → result", "固定按钮宽度", "只替换内部内容"], ["idle", "loading", "success", "result"], ["state-machine-driven-ui", "interruption"]),
    "icon-morph": ("图标变形", "菜单、播放等图标优先通过 SVG path 插值完成状态变化。", ["路径点数一致", "200–300ms", "交叉淡入是降级方案"], ["default", "transitioning", "alternate"], ["same-container-transition", "reduced-motion"]),
    "tab-indicator-spring": ("标签指示条", "指示条先拉向新位置，再收缩归位，轻微超调但不影响点击判断。", ["spring 或 cubic-bezier", "超调 5%–10%", "指示条不重建"], ["idle", "moving", "settled"], ["follow", "snap"]),
    "button-stepper-morph": ("按钮变步进器", "加号按钮原位展开为减号、数量和加号，数量归零后收回。", ["同一组件多状态布局", "数量归零自动收回", "保持触发器位置"], ["add", "expanded", "decrementing", "collapsed"], ["state-machine-driven-ui", "same-container-transition"]),
    "inline-detail-expand": ("列表展开详情", "选中列表项就地展开，其余项顺势下移，不跳转详情页。", ["max-height 或 FLIP", "保留选中项上下文", "其他项让位"], ["collapsed", "expanding", "expanded", "collapsing"], ["flip-reentry", "interruption"]),
    "list-grid-flip": ("列表切换网格", "记录旧布局，切换布局后反转并播放到新位置，避免重载和跳变。", ["First/Last/Invert/Play", "transform 优先", "支持快速切换"], ["list", "switching", "grid"], ["flip-reentry", "interruption"]),
    "scroll-header-collapse": ("顶栏随滚动收起", "滚动进度驱动搜索栏和顶栏收缩，反向滚动恢复。", ["scrollY 归一化 0–1", "requestAnimationFrame", "滚动方向迟滞"], ["expanded", "collapsing", "collapsed", "expanding"], ["follow", "reduced-motion"]),
    "fullscreen-reveal-menu": ("菜单铺满全屏", "以触发按钮为中心用圆形揭示铺满全屏，菜单项交错进入。", ["clip-path: circle()", "stagger 30–50ms", "菜单方向可中断"], ["closed", "revealing", "open", "closing"], ["same-container-transition", "interruption"]),
}
for leaf_id, (name, plain, params, states, related) in continuous_patterns.items():
    add_leaf(
        f"terms/interaction/continuous/{leaf_id}.json",
        leaf_id,
        "digital-product-uiux",
        "continuous-interaction",
        name,
        "pattern",
        [entry(
            leaf_id,
            name,
            plain,
            "需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件",
            params,
            related,
            ["动画必须可中断", "支持 prefers-reduced-motion", "状态变化不能重复触发回调"],
            state_machine=states,
            acceptance=["状态切换无跳变", "快速操作不产生竞态", "键盘和触摸路径结果一致"],
        )],
        ["design-continuous", "implement-continuous", "audit-continuous"],
    )

# These interaction leaves translate a visual feeling into observable timing,
# spatial and sequencing terms. They stay independent so a query loads one
# interaction pattern instead of the entire motion catalog.
measurable_continuous_interactions = {
    "checkbox-cascade": {
        "title": "勾选联动",
        "plain": "一次勾选按明确先后驱动顶部背景、进度环和数字滚动，多个反馈共享同一完成结果。",
        "parameters": ["勾选反馈 80–160ms", "背景渐变 180–300ms", "进度环绘制 400–700ms", "数字滚动 300–500ms", "stroke-dashoffset", "数字 Y 轴偏移"],
        "sequence": ["checkbox checked", "top background transition", "progress ring draw", "count update", "settled"],
        "spatial_anchor": ["复选框是触发源", "顶部背景覆盖状态区域", "进度环围绕当前任务指标", "数字与进度环保持同一视觉组"],
        "accessibility": ["键盘 Space/Enter 可勾选", "aria-checked 与视觉状态同步", "减少动态时保留最终进度和数字"],
        "acceptance": ["勾选后所有反馈都出现", "进度环不早于触发状态", "数字与进度百分比一致", "快速连续勾选不会叠加旧动画"],
    },
    "stack-card-expand": {
        "title": "叠卡展开",
        "plain": "叠放卡片点击或下滑后扇出成完整铺排，再沿原空间路径叠回，展开期间锁定下方卡片误触。",
        "parameters": ["Y 轴位移按卡片间距递增", "旋转角度按扇出方向分配", "缩放比例逐层收敛到 1", "Z 轴层级从前到后重排", "展开/收回使用同一锚点"],
        "sequence": ["collapsed stack", "fan out", "content reveal", "expanded layout", "reverse stack"],
        "spatial_anchor": ["首张卡片作为展开原点", "卡片沿预设扇形或垂直轨迹排列", "每张卡片保留可点击区域", "关闭时回到原重叠位置"],
        "accessibility": ["键盘 Enter/Space 展开", "aria-expanded 表达状态", "减少动态时直接切换布局但保留层级"],
        "acceptance": ["展开前后首张卡位置连续", "卡片不互相遮挡关键内容", "展开期间下层卡片不可误触", "关闭沿原路回叠"],
    },
    "snap-card-timeline": {
        "title": "吸附卡加画线",
        "plain": "卡片先减速吸附到最近目标，停稳后时间线再从起点逐段绘制到对应卡片位置。",
        "parameters": ["先吸附后绘制", "卡片停止后延迟 80–160ms", "timeline duration 300–600ms", "stroke-dasharray", "stroke-dashoffset", "卡片最终 Y 轴位置"],
        "sequence": ["drag or scroll", "decelerating", "snap to nearest card", "settled", "timeline draw", "complete"],
        "spatial_anchor": ["吸附目标由最近卡片决定", "时间线起点固定在轨道起点", "终点对齐卡片中心或锚点", "线段绘制方向与滚动方向一致"],
        "accessibility": ["键盘切换卡片时同样触发落位反馈", "aria-current 标记当前卡片", "减少动态时显示完整时间线"],
        "acceptance": ["时间线绝不早于卡片停稳", "吸附目标稳定不抖动", "线终点准确对齐卡片", "取消或快速切换不会残留旧线段"],
    },
    "radial-reveal-transition": {
        "title": "圆形扩散转场",
        "plain": "从真实点击位置捕获圆心，以 clip-path circle 扩散覆盖屏幕，完全覆盖后再显示新页面内容。",
        "parameters": ["捕获 pointer x/y", "最大半径覆盖最远屏幕角", "扩散 duration 300–500ms", "easing ease-out", "新页面在覆盖完成后进入"],
        "sequence": ["capture origin", "circle expand", "screen covered", "new content enter", "settled", "reverse on back"],
        "spatial_anchor": ["圆心等于触点坐标", "半径取触点到最远角距离", "新旧页面共享同一转场层", "返回时沿反向路径收回"],
        "accessibility": ["键盘触发使用按钮中心作为安全圆心", "焦点在新页面可交互后移动", "prefers-reduced-motion 时取消扩散但保留状态切换"],
        "acceptance": ["圆心不偏离触点", "覆盖完成前不暴露新旧页面混合帧", "返回操作可逆", "视口变化时重新计算最大半径"],
    },
}
for leaf_id, spec in measurable_continuous_interactions.items():
    add_leaf(
        f"terms/interaction/continuous/{leaf_id}.json",
        leaf_id,
        "digital-product-uiux",
        "continuous-interaction",
        spec["title"],
        "technique",
        [entry(
            leaf_id,
            spec["title"],
            spec["plain"],
            "用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时",
            spec["parameters"],
            ["follow", "snap", "interruption", "reduced-motion"],
            ["避免生硬切换", "动画顺序必须可验证", "必须支持中断和反向回退"],
            aliases=[spec["title"], leaf_id.replace("-", " ")],
            state_machine=spec["sequence"],
            animation_sequence=spec["sequence"],
            spatial_anchor=spec["spatial_anchor"],
            accessibility=spec["accessibility"],
            acceptance=spec["acceptance"],
        )],
        ["design-continuous", "implement-continuous", "audit-continuous"],
    )

advanced_interactions = {
    "press-and-hold-confirm": ("按住蓄力确认", "按住危险操作按钮达到 800–1200ms 才确认，未满松手或移动超限则取消。", ["pressing", "charging", "confirmed", "cancel"], ["800–1200ms", "移动超过 10px 取消", "多点触控只认第一指", "进度环与按压时间一致"], ["键盘 Space/Enter", "ESC 取消", "aria-describedby", "替代二次确认"]),
    "rotary-knob": ("旋钮转盘", "拖动或用键盘旋转旋钮，释放后吸附到最近刻度，中心数值同步变化。", ["dragging", "snapping", "idle"], ["-135° 到 +135°", "步进 1 或 5", "小于 0.35 步长磁吸", "touch-action: none"], ["role=slider", "aria-valuemin/max/now", "Home/End 到极值"]),
    "before-after-slider": ("前后对比滑块", "拖动分割线实时裁切两张图，位置在 0%–100%，不使用惯性。", ["idle", "dragging"], ["初始 50%", "clip-path: inset()", "拖动无过渡", "容器 resize 重新计算"], ["role=slider", "左右箭头步进", "图片失败时保留可用状态"]),
    "radial-menu": ("弧形快捷菜单", "长按悬浮按钮展开弧形子菜单，子项沿弧线交错弹出并支持边缘翻转。", ["pressing", "open", "closing"], ["长按 400–500ms", "移动超过 10px 取消", "stagger 30–50ms", "边缘翻转弧线方向"], ["aria-expanded", "role=menuitem", "ESC 焦点返回"]),
    "slide-to-confirm": ("滑动确认组件", "滑块超过 80% 才确认，不足松手则弹回，确认只触发一次。", ["dragging", "threshold", "confirmed", "returning"], ["80% 阈值", "达到阈值加速到末端", "spring 回弹", "移动端阻止页面滚动"], ["role=slider", "Enter/Space 确认", "危险操作提供替代确认"]),
    "long-press-preview": ("长按浮起预览", "长按列表项打开上下文预览，选中项浮起，菜单在局部空间内展开。", ["pressing", "preview", "menu", "closing"], ["450–600ms", "移动超过 10px 取消", "背景 blur 8px", "虚拟列表卸载时关闭"], ["Enter 打开", "焦点陷阱", "ESC 返回列表项"]),
    "drag-to-absorb": ("拖到目标吸入", "拖拽元素靠近目标后目标张开，松手时元素缩小并吸入目标中心。", ["dragging", "hovering", "dropping", "absorbed", "returning"], ["目标半径 1.2 倍或外扩 48px", "目标 scale 1.15", "元素缩至 0.2", "未命中回原位"], ["键盘移动和放置", "目标重叠时按优先级", "多点触控只认第一指"]),
    "segmented-progress": ("分段进度条", "按住暂停，点击左右区域切换上一项或下一项，进度与内容同步。", ["playing", "paused", "switching"], ["200ms 内抬起判定点击", "左右 35% 切换", "中间 30% 暂停", "最后一项循环"], ["左右箭头", "Space 暂停", "aria-live 当前项"]),
    "perspective-carousel": ("景随图换轮播", "拖动距离或速度达到阈值后切换，中心项放大，侧边项透视缩小。", ["dragging", "snapping", "switching"], ["距离超过 20% 或速度超过 0.5px/ms", "perspective 1000px", "侧项 scale 0.85", "无限循环无跳帧"], ["aria-roledescription=carousel", "aria-current", "图片失败降级"]),
    "inertial-wheel": ("惯性滚轮", "时间或数值滚轮在释放后继承速度惯性减速，越界时阻尼回弹并吸附到最近刻度。", ["dragging", "inertial", "decelerating", "overscrolling", "snapping", "settled"], ["手指阶段 1:1 跟手", "释放后保存 velocity", "friction 衰减", "越界阻尼", "spring 刚度/阻尼", "最近刻度吸附", "限制最大速度避免眩晕"], ["role=slider", "键盘离散步进", "Home/End 到极值", "减少动态时保留当前刻度"]),
}
for leaf_id, (name, plain, states, params, accessibility) in advanced_interactions.items():
    add_leaf(
        f"terms/interaction/advanced/{leaf_id}.json",
        leaf_id,
        "digital-product-uiux",
        "gesture-interaction",
        name,
        "pattern",
        [entry(
            leaf_id,
            name,
            plain,
            "需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互",
            params,
            ["follow", "threshold", "snap", "interruption"],
            ["未达到阈值不能触发", "快速重复操作不叠加", "组件卸载时清理定时器和动画"],
            state_machine=states,
            accessibility=accessibility,
            acceptance=["60fps", "手势和键盘结果一致", "取消后状态完全复位"],
        )],
        ["design-gesture", "implement-gesture", "audit-gesture"],
    )

add_leaf(
    "terms/interaction/advanced/edge-docked-fab.json",
    "edge-docked-fab",
    "digital-product-uiux",
    "gesture-interaction",
    "吸边悬浮球",
    "pattern",
    [entry(
        "edge-docked-fab",
        "吸边悬浮球",
        "毛玻璃悬浮球跟手拖拽，释放后吸附到最近左右边缘，闲置后缩成半透明贴边状态。",
        "需要可移动的悬浮入口，同时避免遮挡底部 Tab 和安全区内容",
        ["56px 圆球", "0.02 惯性", "距边 12px", "spring 300/30", "无操作 3s 后缩小", "滚动时 opacity 0.4", "停止滚动 400ms 恢复", "垂直位置限制在安全区"],
        ["follow", "velocity-inheritance", "snap", "interruption"],
        ["拖拽不能穿出安全区", "吸附后仍保留可点击面积", "页面滚动时不能遮挡底部 Tab", "组件卸载时清理滚动监听和恢复定时器"],
        aliases=["吸边悬浮球", "贴边悬浮按钮", "edge docked fab"],
        state_machine=["idle", "dragging", "snapping", "docked", "shrunk", "restoring"],
        animation_sequence=["follow pointer", "project release velocity", "snap to nearest edge", "shrink after idle", "restore after scroll"],
        spatial_anchor=["左右边缘为吸附锚点", "距边 12px", "垂直范围避开安全区和底部 Tab"],
        accessibility=["键盘焦点可达", "方向键移动或提供设置入口替代拖拽", "aria-label 描述悬浮入口", "减少动态时取消缩小和惯性"],
        acceptance=["拖拽 1:1 跟手", "释放后稳定吸边", "滚动透明度反馈及时", "不遮挡关键导航", "快速拖拽不产生双重吸附"],
    )],
    ["design-gesture", "implement-gesture", "audit-gesture"],
)

# Dashboard terms and reusable style template.
dashboard_entries = {
    "warm-minimal": ("暖调留白型", "奶油底色、单一黄色强调、细边框和弱阴影，保留呼吸感。", ["#F7F3EA", "一个主强调色", "圆角克制", "弱阴影"]),
    "high-contrast": ("强对比视觉型", "一张主卡占据视觉中心，用高饱和对比和大数字建立层级。", ["主卡占视觉中心", "硬阴影", "大数字", "非对称"]),
    "minimal-data": ("极简数据型", "以灰阶和一个强调色组织数据，去网格线和多余标签。", ["灰阶为主", "胶囊柱状图", "标签精简"]),
    "immersive-atmosphere": ("氛围沉浸型", "深色底、雾面渐变、玻璃卡片和轻微动态光斑。", ["GPU 负载预算", "移动端降级", "模糊光斑"]),
    "image-led-content": ("图卡内容型", "让真实图片成为主角，文字叠加且只保留一个强调色。", ["大图卡片", "文字叠加", "单一 CTA 色"]),
    "layout-patterns": ("高级布局模式", "用错位、大图、非对称、层叠、留白和破格出血建立布局性格。", ["错位按 8/12/16px 节奏", "7:3 或 8:2 比例", "只破一处网格", "安全区内留信息"]),
    "grid-glass-dashboard": ("方格纸玻璃卡 Dashboard", "用 44px 方格纸做底，让半透明白玻璃卡透出底层网格，指标按数值形成阶梯。", ["44px 网格底", "半透明白玻璃", "指标阶梯排列", "实心/斜纹/渐变填充"]),
    "grouped-sidebar-dashboard": ("分组侧边栏 Dashboard", "把导航拆成三组并用大留白分隔，主区用超大细体字、三组数字和横向比例条建立节奏。", ["三组导航", "10px 大写灰字组名", "底部头像/用量条", "横向比例条替代饼图"]),
    "single-dark-accent-dashboard": ("单深色单强调色 Dashboard", "整页只保留一条深色侧边栏和一个强调色，当前项、主按钮和命中图表共享同一强调色。", ["唯一深色侧边栏", "单一强调色", "侧栏底部强调色卡片", "其余区域保持浅色"]),
    "tonal-dark-dashboard": ("暗底明度分层 Dashboard", "近黑底上只用明度区分卡片层级，不画描边；主读数放大，日期用圆点阵列表达。", ["近黑底", "卡片亮一档", "无描边", "超大主读数", "圆点阵列+斜纹空格"]),
}
for leaf_id, (name, plain, params) in dashboard_entries.items():
    add_leaf(f"terms/dashboard/{leaf_id}.json", leaf_id, "digital-product-uiux", "dashboard-design", name, "pattern", [entry(leaf_id, name, plain, "Dashboard 需要有明确审美方向且避免模板化", params, ["design-tokens", "layout-patterns"], ["不要所有卡片一样大", "不要默认蓝紫渐变", "不要模板化侧边栏+四张 KPI 卡"])], ["design-dashboard", "audit-dashboard"])

# Dashboard recipes that need their own routing leaf because each one changes
# the page's primary visual judgment. Keep them separate from generic tokens.

# Visual effects are implementation-sensitive: load the performance and
# degradation contract together with the visual recipe.
visual_effects = {
    "liquid-glass-bar": (
        "液态玻璃栏",
        "固定导航使用背景模糊、轻微折射和随滚动位移的高光，底色与文字对比度随背景亮度平滑调整。",
        ["backdrop-filter", "SVG displacement", "高光层", "亮度采样", "scroll-driven animation"],
        ["桌面端优先使用 GPU 合成", "高光和折射必须限制在导航区域", "文字对比度持续满足可读性"],
        ["不支持 backdrop-filter 时退化为不透明底色", "低端设备关闭折射只保留模糊或纯色"],
        ["移动端降低模糊半径", "滚动中避免逐帧读取布局"],
        ["prefers-reduced-motion 下停用高光流动，保留静态玻璃层"],
    ),
    "cover-color-ambient-glow": (
        "封面取色氛围光",
        "从封面图提取主色生成外围柔光，换图时用连续插值过渡而不是颜色突变。",
        ["Canvas/ColorThief 取色", "radial-gradient", "CSS variables", "颜色插值"],
        ["采样结果需要做饱和度和亮度限幅", "柔光不能降低正文对比度"],
        ["取色失败时回退到主题色", "设备性能不足时只保留静态渐变"],
        ["移动端降低光晕半径和不透明度", "图片切换只更新 CSS 变量"],
        ["减少动态时保留最终主色，取消颜色过渡"],
    ),
    "depth-layer-scroll": (
        "景深分层滚动",
        "把内容拆为前、中、后三层，按滚动进度驱动不同速度、模糊和亮度，形成可控景深。",
        ["scroll progress", "translateY", "blur/brightness", "lerp"],
        ["后层速度更慢且更模糊", "前层速度更快且更清晰", "只动画 transform 和 opacity"],
        ["不支持滤镜时只保留位移层级", "滚动性能不足时关闭实时 blur"],
        ["移动端减少层数至两层", "使用 requestAnimationFrame 合并滚动采样"],
        ["减少动态时取消视差和模糊变化，保留静态层级"],
    ),
    "cylindrical-list": (
        "圆柱卷收列表",
        "根据列表项距视区中心的距离插值旋转、缩放、亮度和透明度，让中心项突出、边缘项自然卷入。",
        ["rotateX/rotateY", "scale", "opacity", "中心距离", "scroll snap"],
        ["中心项必须保持清晰可读", "旋转角度随距离连续变化", "滚动停止后再交给 snap 接管"],
        ["不支持 3D 时退化为缩放和透明度", "低端设备关闭实时滤镜"],
        ["移动端限制透视深度和可见项数量", "虚拟列表避免为不可见项计算变换"],
        ["减少动态时保留中心突出，不播放卷收路径"],
    ),
    "liquid-adhesion-drag": (
        "液滴粘连拖拽",
        "拖动元素与原位之间生成液态粘连连接，距离增大时颈部收缩，超过阈值后断开并弹性回圆。",
        ["SVG path/metaball", "Canvas", "贝塞尔曲线", "spring"],
        ["粘连距离必须有上限", "断裂阈值要有迟滞避免抖动", "断裂后两端分别回弹"],
        ["不支持 SVG/Canvas 时退化为连接线或无粘连拖拽", "高负载时降低采样频率"],
        ["移动端减少路径采样点", "拖动期间阻止页面滚动但允许取消"],
        ["减少动态时取消粘连形变，保留拖拽和命中结果"],
    ),
}
for leaf_id, (name, plain, params, budget, fallback, mobile, reduced_motion) in visual_effects.items():
    add_leaf(
        f"terms/visual-effects/{leaf_id}.json",
        leaf_id,
        "digital-product-uiux",
        "visual-effects",
        name,
        "technique",
        [entry(
            leaf_id,
            name,
            plain,
            "需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本",
            params,
            ["performance-budget", "progressive-degradation", "reduced-motion"],
            ["动效必须可中断", "优先 transform/opacity", "不得以视觉效果掩盖可读性"],
            performance_budget=budget,
            fallback=fallback,
            mobile_degradation=mobile,
            reduced_motion=reduced_motion,
            acceptance=["滚动或拖拽保持 60fps 目标", "降级后主任务仍可完成", "视觉层不影响文本对比度"],
        )],
        ["design-visual-effect", "implement-visual-effect", "audit-performance"],
    )

# GSAP entries are provider-specific adapter notes. They describe integration
# boundaries and cleanup, not a replacement for the official API reference.
gsap_leaves = {
    "gsap-core": ("GSAP Core", "tween、duration、easing、stagger 和可中断控制的基础适配。", ["gsap.to/from/fromTo", "duration", "ease", "stagger", "killTweensOf"], ["优先动画 transform/opacity", "从当前值继续而不是重置起点"], ["官方 API 版本变化需复核"]),
    "gsap-timeline": ("GSAP Timeline", "用时间线、label 和 position parameter 编排连续动效，保持顺序可读且可复用。", ["timeline", "label", "position parameter", "nested timeline", "play/pause/reverse"], ["时间线必须有明确生命周期", "组件卸载时杀掉 timeline"], ["复杂时间线应拆为可测试片段"]),
    "gsap-scrolltrigger": ("GSAP ScrollTrigger", "用 scrub、pin 和 start/end 将动画绑定到滚动进度，并避免把滚动逻辑散落在组件中。", ["ScrollTrigger", "scrub", "pin", "start/end", "refresh"], ["滚动驱动优先使用 transform", "动态内容变化后显式 refresh"], ["SSR 和无 DOM 环境不能初始化插件"]),
    "gsap-plugins": ("GSAP Plugins", "按需使用 Flip、Draggable、Observer、SplitText 等插件，插件能力必须和交互目标一一对应。", ["Flip", "Draggable", "Observer", "SplitText", "registerPlugin"], ["只注册实际使用的插件", "拖拽和 Flip 必须有取消与回退路径"], ["插件 API 与授权边界以官方文档为准"]),
    "gsap-react-lifecycle": ("GSAP React 生命周期", "在 React 中用 useGSAP 或 gsap.context 管理选择器作用域、动画创建和 ctx.revert 清理。", ["useGSAP", "gsap.context", "scope", "ctx.revert", "dependencies"], ["动画创建绑定组件生命周期", "依赖变化先清理旧动画"], ["避免在 render 阶段创建动画"]),
    "gsap-performance": ("GSAP 性能边界", "把高频动效限制在合成属性，批量更新并减少布局读取，给复杂效果设置设备降级策略。", ["transform", "opacity", "batching", "will-change", "layout thrash"], ["不要连续写 width/height/top/left", "will-change 只在短时交互启用"], ["低端设备关闭粒子、滤镜或 3D 透视"]),
    "gsap-frameworks": ("GSAP 框架适配", "在 Vue、Svelte 等框架中按生命周期创建和销毁上下文，隔离 SSR、hydration 与客户端动画。", ["onMounted/onUnmounted", "onMount/onDestroy", "SSR guard", "hydration", "context cleanup"], ["只在客户端创建动画", "路由切换时完整清理"], ["框架封装层不要隐藏 kill/revert 能力"]),
}
for leaf_id, (title, plain, params, constraints, verification) in gsap_leaves.items():
    add_leaf(
        f"terms/animation-tool-adapter/{leaf_id}.json",
        leaf_id,
        "digital-product-uiux",
        "animation-tool-adapter",
        title,
        "technique",
        [entry(
            leaf_id,
            title,
            plain,
            "用户明确指定 GSAP，或项目已经采用 GSAP 作为动效实现层",
            params,
            ["continuous-interaction", "performance-budget", "interruption"],
            constraints,
            aliases=["GSAP", title.lower()],
            provider="GSAP",
            provider_specific=True,
            verification_required=True,
            verification_note=verification,
            acceptance=["动画创建和销毁可追踪", "快速交互不产生重复回调", "未指定 GSAP 时不强制引入"],
        )],
        ["implement-gsap", "audit-gsap"],
        scope="provider-specific",
        extra={"do_not_generalize": True, "provider": "GSAP", "verified_at": None, "verification_required": True},
    )

# A living style guide is a review artifact: it maps design tokens to rendered
# Light/Dark states and records external preview links as pending references.
add_leaf(
    "terms/design-system/living-style-guide-preview.json",
    "living-style-guide-preview",
    "digital-product-uiux",
    "design-system",
    "设计系统活样式预览",
    "guideline",
    [entry(
        "living-style-guide-preview",
        "Light/Dark 活样式指南",
        "用可直接打开的预览把色板、字体层级、组件状态和设计令牌映射到真实页面效果。",
        "需要让设计评审和 AI 在写代码前先确认视觉方向",
        ["Light/Dark 双主题", "色板与语义色", "字体排印层级", "按钮/输入框/卡片", "hover/click/disabled", "token 到页面效果映射"],
        ["design-tokens", "dashboard-style-system", "accessibility"],
        ["预览状态必须可复现", "颜色不能是唯一状态表达", "外部预览站和品牌资料保持待核验标记"],
        verification_checklist=["色板、排印、组件状态齐全", "浅色和深色对比度通过", "交互状态与 token 一致", "截图或浏览器验收后再发布"],
        external_references=[{"kind": "preview-site", "status": "pending-verification", "url": "https://awesome-design-md-preview.vercel.app"}],
        verified_at=None,
        verification_required=True,
    )],
    ["build-design-system", "preview-design-system", "audit-design-system"],
    extra={
        "verification_required": True,
        "verified_at": None,
        "external_reference_policy": "外部预览资源只作待核验线索，不作为运行时事实",
    },
)

# Eight AI-feedable component descriptions.
components = {
    "tilt-light-panel": ("3D 倾斜光影面板", "监听 pointermove/touchmove 计算 rotateX/rotateY，最大倾斜 8–12°，叠加随指针移动的径向高光，松手用 Spring 回正。", ["pointer tracking", "perspective", "preserve-3d", "radial-gradient", "spring damping"]),
    "fluid-capsule-morph": ("流体胶囊形变", "胶囊按钮通过 FLIP/shared layout 形变为弹窗，圆角从 999px 过渡到 24px，内容延迟淡入并带遮罩。", ["fluid morph", "FLIP", "layout animation", "border-radius morph"]),
    "shared-element-expand": ("共享元素无缝展开", "列表卡片到详情页使用同一 layoutId，图片、标题和容器连续缩放，背景遮罩淡入，避免跳变。", ["shared element transition", "layoutId", "matched geometry", "continuous scale"]),
    "magnetic-cursor-odometer": ("磁吸游标与滚动码表", "折线图拖拽时数据点磁吸，顶部数值使用 Odometer 按位滚动，拖拽、吸附和数值用 lerp+spring 联动。", ["magnetic snap", "odometer", "tabular-nums", "lerp", "spring follow"]),
    "damped-bottom-sheet": ("阻尼弹性抽屉", "Bottom Sheet 根据位移和速度在 closed/peek/half/full 锚点间吸附，越界呈 rubber band 回弹。", ["rubber band", "velocity projection", "snap points", "spring snap"]),
    "diffused-glow-border": ("动态弥散光晕边框", "用 conic-gradient 旋转描边，叠加 blur+opacity 呼吸背光，并用 mask 保留描边区域。", ["conic-gradient", "breathing glow", "blur halo", "mask composite"]),
    "spring-stagger-flow": ("物理弹簧交错流", "列表子项按 index*0.03–0.06s 交错，从 y:20、opacity:0 进入并带轻微 spring。", ["staggerChildren", "spring cascade", "y-offset", "stagger delay"]),
    "elastic-press-feedback": ("弹性微缩触觉反馈", "按钮按压缩到 0.96 并增加内阴影，释放时 Spring 轻微超调回 1，支持快速连点。", ["whileTap", "scale 0.96", "inset shadow", "spring overshoot"]),
}
for leaf_id, (name, plain, params) in components.items():
    add_leaf(f"terms/component-design/{leaf_id}.json", leaf_id, "digital-product-uiux", "component-design", name, "template", [entry(leaf_id, name, plain, "需要给 AI 编程或设计工具描述可复用组件", params, ["follow", "interruption"])], ["generate-component", "spec-component"])

# Fill the adjacent UI/UX subdomains so routing can become finer without loading a
# monolithic UI package.
add_leaf("terms/visual-layout/composition-patterns.json", "composition-patterns", "digital-product-uiux", "visual-layout", "高级布局六式", "pattern", [
    entry("composition-patterns", "卡片错位/大图主导/非对称/层叠/留白/破格出血", "用比例、层级和安全区建立页面性格；每次只让少数元素破格。", "首屏、活动页、详情页和内容信息流", ["错位按 8/12/16px 节奏", "主图可占半屏或出血", "使用 7:3 或 8:2 非对称", "只破一处网格，内容留在安全区"], ["layout-patterns", "design-tokens"], ["错位无规律会像未对齐", "出血过多会削弱秩序", "留白必须仍有视觉焦点"])
], ["design-layout", "audit-layout"])
add_leaf("terms/design-tokens/token-system.json", "token-system", "digital-product-uiux", "design-tokens", "设计令牌系统", "parameter", [
    entry("token-system", "底色/强调色/层级/材质/主角五变量", "Dashboard 的审美方向主要由底色、强调色、布局层级、材质和内容主角决定。", "需要让 AI 生成非模板化后台或设计系统", ["背景色", "主强调色", "文字层级", "圆角/阴影", "卡片材质", "内容主角"], ["dashboard-style-system", "composition-patterns"], ["先定 token 再定组件，不要每张卡单独发明规则"])
], ["define-tokens", "audit-tokens"])
add_leaf("terms/information-architecture/information-hierarchy.json", "information-hierarchy", "digital-product-uiux", "information-architecture", "信息层级与密度", "principle", [
    entry("information-hierarchy", "信息层级", "先确定用户要做的决定，再按主次组织标题、数据、操作和辅助说明。", "复杂后台、内容页和移动端首页", ["主任务优先", "每屏保留一个视觉主角", "用密度和留白表达层级"], ["composition-patterns", "token-system"], ["不要用颜色和图标堆叠替代结构"])
], ["design-information", "audit-information"])

# AIGC is split by prompt concern so a character request does not load camera,
# negative-prompt and tool adapter knowledge at once.
add_leaf("terms/image-prompt/prompt-blocks.json", "prompt-blocks", "ai-aigc-meta-skills", "image-prompt", "图像提示词模块", "template", [
    entry("prompt-blocks", "主体/材质/光线/构图/质量模块", "把图像提示词拆为可重排模块，先锁主体，再补材质、光线、构图和质量。", "文生图、参考图重绘和产品效果图", ["subject", "material", "lighting", "composition", "quality"], ["character-ip", "negative-constraints"], ["不要把所有风格词混成一段无层级文本"])
], ["write-image-prompt", "audit-image-prompt"])
add_leaf("terms/video-prompt/video-direction.json", "video-direction", "ai-aigc-meta-skills", "video-prompt", "视频镜头与运动描述", "template", [
    entry("video-direction", "镜头/主体运动/声音三层描述", "视频提示词至少拆成景别、镜头运动、主体动作、节奏和声音。", "文生视频和分镜生成", ["shot", "camera_motion", "subject_motion", "tempo", "sound"], ["camera-language", "motion-language"], ["不要只写电影感而不说明可观察的镜头行为"])
], ["write-video-prompt", "audit-video-prompt"])
add_leaf("terms/material-style/material-library.json", "material-library", "ai-aigc-meta-skills", "material-style", "材质风格词", "term", [
    entry("material-library", "材质与反射", "用可观察的表面属性描述材质，例如高光泽釉面、短植绒、哑光纸张和半通透胶带。", "产品渲染、角色周边和材质迁移", ["roughness", "specular", "translucency", "texture"], ["prompt-blocks", "character-ip"], ["材质词不能替代主体和结构约束"])
], ["write-image-prompt"])
add_leaf("terms/camera-language/camera-language.json", "camera-language", "ai-aigc-meta-skills", "camera-language", "镜头语言", "term", [
    entry("camera-language", "景别/机位/焦段/运镜", "把电影感拆成可执行的景别、机位、焦段、景深和运动。", "想要电影感但需要稳定复现时", ["close/medium/wide", "high/low angle", "lens", "depth of field", "camera motion"], ["video-direction", "composition"], ["不要用受版权保护的具体作品名作为唯一指令"])
], ["write-image-prompt", "write-video-prompt"])
add_leaf("terms/composition/composition-language.json", "composition-language", "ai-aigc-meta-skills", "composition", "构图语言", "term", [
    entry("composition-language", "主体位置与视觉动线", "用中心、三分、对称、留白、前中后景和视觉引导线描述构图。", "需要主体位置和画面平衡可控时", ["subject placement", "negative space", "foreground/midground/background", "leading lines"], ["camera-language", "prompt-blocks"], ["构图要服务内容主角，不要为了术语堆叠"])
], ["write-image-prompt", "audit-image-prompt"])
add_leaf("terms/motion-control/motion-language.json", "motion-language", "ai-aigc-meta-skills", "motion-control", "动作与运动控制", "technique", [
    entry("motion-language", "方向/速度/幅度/节奏", "明确主体怎么动、镜头怎么动、速度和幅度如何变化。", "文生视频、产品动效和角色动作延展", ["direction", "speed", "amplitude", "rhythm", "follow"], ["video-direction", "velocity-inheritance"], ["动作必须可观察，避免只写情绪形容词"])
], ["write-video-prompt"])
add_leaf("terms/negative-prompt/negative-constraints.json", "negative-constraints", "ai-aigc-meta-skills", "negative-prompt", "负面约束", "guideline", [
    entry("negative-constraints", "结构/材质/一致性负面词", "把不希望出现的变形、额外肢体、颜色漂移、重复主体和低清晰度写成约束。", "角色一致性、产品渲染和批量出图", ["结构禁用", "材质禁用", "画面质量禁用"], ["character-ip", "prompt-blocks"], ["负面词不能掩盖主体描述不完整"])
], ["write-image-prompt", "audit-image-prompt"])
add_leaf("terms/tool-adapter/tool-parameters.json", "tool-parameters", "ai-aigc-meta-skills", "tool-adapter", "工具参数适配", "template", [
    entry("tool-parameters", "通用/Midjourney/SD 适配", "把同一套提示词拆成通用正文、画幅参数和工具专用控制字段。", "需要在多个生图工具间复用提示词", ["aspect_ratio", "style", "negative_prompt", "controlnet"], ["prompt-blocks", "negative-constraints"], ["工具参数是适配层，不改变核心语义"])
], ["write-image-prompt", "write-video-prompt"])

# Backend architecture is split into independently retrievable reliability concerns.
backend_leaves = {
    "service-boundary": ("backend-architecture", "服务边界与状态", "把服务职责、同步/异步边界、状态归属和数据一致性写清楚。", ["service ownership", "sync/async", "state ownership", "consistency"]),
    "availability-patterns": ("high-availability", "高可用模式", "跨实例、节点或可用区部署关键组件，并定义 RTO/RPO 和故障转移。", ["failure domain", "redundancy", "RTO", "RPO", "failover"]),
    "capacity-model": ("high-concurrency", "并发容量模型", "用平均值、峰值、突发、P95/P99 和增长率描述高并发，而不是只说高并发。", ["RPS", "burst", "P95/P99", "growth rate"]),
    "scaling-strategies": ("scalability", "扩展策略", "按无状态实例、缓存、分片和异步队列拆解增长路径。", ["horizontal scaling", "sharding", "cache", "async"]),
    "observability-contract": ("observability", "可观测性契约", "将 SLI/SLO、日志、指标、追踪、告警和故障演练绑定到服务目标。", ["SLI", "SLO", "logs", "metrics", "traces", "alerts"]),
    "idempotency-contract": ("idempotency", "幂等契约", "用操作身份、同键重试、内容一致性、并发响应和结果关联定义重复处理。", ["operation key", "retry", "payload match", "in-progress", "result record"]),
    "frontend-runtime": ("frontend-platform", "前端平台边界", "把组件、构建、运行时、发布和回滚能力作为平台契约。", ["component API", "build", "runtime", "release", "rollback"]),
    "cross-platform-rendering": ("desktop-web-mobile", "跨平台渲染边界", "按平台能力、渲染后端、输入方式和降级路径选择实现策略。", ["desktop", "web", "mobile", "renderer", "fallback"]),
}
backend_intents = {
    "backend-architecture": ["design-backend", "review-backend"],
    "high-availability": ["design-ha", "audit-ha"],
    "high-concurrency": ["model-capacity", "tune-performance"],
    "scalability": ["design-scale", "plan-migration"],
    "observability": ["define-slo", "debug-production"],
    "idempotency": ["design-idempotency", "diagnose-duplicate"],
    "frontend-platform": ["design-frontend", "audit-frontend"],
    "desktop-web-mobile": ["compare-platform", "choose-renderer"],
}
for leaf_id, (subdomain, title, plain, params) in backend_leaves.items():
    add_leaf(f"terms/software-engineering/{leaf_id}.json", leaf_id, "software-engineering-architecture", subdomain, title, "term", [
        entry(leaf_id, title, plain, "后端或平台方案需要拆解质量属性时", params, ["high-availability", "capacity-model", "scaling-strategies", "observability-contract", "idempotency-contract"], ["不要把质量属性当作无边界承诺"])
    ], backend_intents[subdomain])

# Workplace language stays explanatory: it translates vague phrases into questions,
# actions and acceptance criteria rather than preserving empty slogans.
workplace_leaves = {
    "jargon-translation": ("vague-expression", "职场黑话翻译", "把“拉齐、抓手、闭环、赋能”等模糊词翻译为对象、动作、负责人和结果。", ["原句", "真实对象", "动作", "负责人", "验收标准"]),
    "dependency-alignment": ("project-collaboration", "项目依赖对齐", "明确依赖方、输入、输出、阻塞风险和升级路径。", ["依赖方", "输入", "输出", "截止时间", "升级路径"]),
    "goal-metric": ("goal-alignment", "目标与指标", "把方向性目标拆成可观察结果、指标口径、范围和优先级。", ["目标", "指标", "口径", "范围", "优先级"]),
    "action-item": ("execution-language", "执行项", "每个执行项写清负责人、下一步、截止时间和完成证据。", ["owner", "next step", "due date", "evidence"]),
    "management-mechanism": ("management-terms", "管理机制", "把机制、复盘、资源配置和组织动作落到可观察的流程。", ["机制", "触发条件", "参与者", "输出", "复盘"]),
}
for leaf_id, (subdomain, title, plain, params) in workplace_leaves.items():
    workplace_intents = {
        "vague-expression": ["clarify-vague", "rewrite-actionable"],
        "project-collaboration": ["align-collaboration", "resolve-dependency"],
        "goal-alignment": ["define-goal", "review-priority"],
        "execution-language": ["write-action", "review-status"],
        "management-terms": ["explain-term", "translate-jargon"],
    }
    add_leaf(f"terms/workplace/{leaf_id}.json", leaf_id, "workplace-communication", subdomain, title, "term", [
        entry(leaf_id, title, plain, "用户说出职场模糊表达或需要改写协作要求时", params, ["information-hierarchy", "goal-metric"], ["不替用户猜测未提供的事实"])
    ], workplace_intents[subdomain])

# Platform research is intentionally scoped and non-generalized.
platforms = {
    "gpui-desktop-web": ("GPUIX 桌面与 Web 平台研究", "provider-specific", "待核验的桌面/Web 平台适配记录；不得推广为所有 GPU UI 框架事实。", ["macOS/Metal", "Windows/DirectX", "Linux/Vulkan", "WebGPU/WebGL2 降级"]),
    "gpui-mobile": ("GPUIX 移动端平台研究", "provider-specific", "移动端支持状态需以官方仓库和版本为准；社区实现不能等同官方支持。", ["iOS/Metal", "Android/Vulkan 或 GL", "触摸、软键盘、安全区"]),
    "three-ui-catalog": ("ThreeUI 组件目录研究", "provider-specific", "目录分类用于检索组件，不代表所有组件都适合生产环境。", ["Landing Pages", "Hero", "Backgrounds", "Buttons", "Text Animation", "Three.js", "UI Elements", "CSS/Motion/Sections"]),
}
for leaf_id, (title, scope, plain, params) in platforms.items():
    add_leaf(f"terms/platform-research/{leaf_id}.json", leaf_id, "digital-product-uiux", "3d-web-interface", title, "platform-research", [entry(leaf_id, title, plain, "用户明确询问指定平台或组件目录", params, [], ["必须标注 provider-specific", "检索时优先官方来源", "verified_at 未设置时不得当作确定事实"])], ["compare-platform", "choose-renderer"], scope=scope, extra={"do_not_generalize": True, "verified_at": None, "verification_required": True})

add_leaf("terms/character-ip/character-ip.json", "character-ip", "ai-aigc-meta-skills", "character-ip", "角色 IP 一致性", "template", [
    entry("base-ip", "基础 IP 设定", "先锁定角色体型、配色、五官、材质和负面约束，再按场景增量加载。", "同一角色需要生成三视图、动作、服装、表情或周边", ["主体描述", "一致性规则", "负面提示词", "参考图"], ["lineart-to-3d", "plush-texture", "merchandise-set"], ["一次只加载一个场景模板"]),
    entry("scene-module", "场景增量模块", "把材质、动作、镜头或周边作为独立模块叠加到基础 IP。", "需要复用角色但更换表现目标", ["scene_id", "aspect_ratio", "tool_adapter"], ["base-ip"], ["不要重复复制完整基础 IP"]),
], ["generate-character", "extend-character"])

# Index all target leaves.
discover_authored_leaves()
for spec in leaf_defs.values():
    domain_id = spec["domain_id"]
    subdomain_id = spec["subdomain_id"]
    if domain_id not in domain_specs:
        continue
    known_subdomains = {item[0] for item in domain_specs[domain_id]}
    if subdomain_id not in known_subdomains:
        domain_specs[domain_id].append(
            (subdomain_id, spec["title"], f"手工新增的 {subdomain_id} 叶子入口")
        )
leaf_refs = []
for leaf_id, spec in sorted(leaf_defs.items()):
    adopt_existing_leaf(spec)
    leaf_ref = {
        "leaf_id": leaf_id, "title": spec["title"], "path": spec["path"], "domain_id": spec["domain_id"], "subdomain_id": spec["subdomain_id"],
        "knowledge_type": spec["knowledge_type"], "status": spec["status"], "intent_ids": spec["intent_ids"], "scope": spec["scope"],
        "entry_count": len(spec["entries"]), "do_not_generalize": spec.get("do_not_generalize", False)
    }
    if spec.get("provider"):
        leaf_ref["provider"] = spec["provider"]
    leaf_refs.append(leaf_ref)

# Build references only after adopting the authored leaf contents.
dump(DASHBOARD_STYLE_TEMPLATE_PATH, {
    "schema_version": "1.0.0", "template_id": "dashboard-style-system", "name": "Dashboard 审美 Skill", "type": "template",
    "inputs": ["product_or_scene", "style_direction", "content_priority"],
    "style_directions": [{"id": k, "name": v[0], "rule": v[1], "tokens": v[2]} for k, v in dashboard_entries.items()],
    "output_contract": ["页面结构", "色彩规范", "组件规范", "可直接给 AI 的提示词"],
    "field_contract": {
        "layout": "布局名称与信息结构；不新增同义叶子",
        "termSkill": "专业术语与结构关系；引用现有分类",
        "uiSkill": "视觉层级、栅格、材质、排版；不负责修改业务状态",
        "agentExec": "事件、前置条件、写入状态、派生视图与不受影响的状态",
        "state": "唯一事实源、派生关系、不变量；新增实现建议需明确标记",
        "tokens": "明确单位与适用范围；用户示例值不是全局默认值"
    },
    "shared_execution_contract": {
        "flow": [
            "事件",
            "校验/前置条件",
            "一次状态转换",
            "派生所有关联视图",
            "验收"
        ],
        "rules": [
            "共享的是选择 ID 与时间上下文，不是每个面板各自复制一份状态；独立控件不得误联动。",
            "展示读数由状态派生；请求失败、空数据与快速连续切换不得留下混合视图，异步结果需校验当前上下文。",
            "颜色/尺寸是当前示例的 token，不是行为触发条件；计数从集合派生，不写死 7→8。",
            "键盘与指针操作保持同样状态结果；选中/加载/错误不能只靠颜色，动态效果提供减少动态路径。",
            "固定栏不等于固定整个页面；窄屏策略与断点未提供时先标记建议，不臆造原稿数值。"
        ],
        "acceptance": [
            "事件前/后真实截图覆盖受影响与不受影响区域",
            "端到端验证状态联动、独立性、错误/快速切换与键盘路径",
            "截图只验证可见结果，状态一致性同时用断言验证"
        ]
    },
    "source_gaps": [
        {
            "slot": 5,
            "status": "needs_confirmation",
            "entry_id": "warm-three-column-dashboard",
            "missing": "完整点击逻辑、模式与单位映射；候选执行逻辑不得默认落地"
        },
        {
            "slot": 6,
            "status": "missing",
            "missing": "第六个 Dashboard 的三层提示词原文",
            "policy": "不创建空叶子、不生成虚构案例，不声称六例完整"
        }
    ],
    "pattern_refs": [
        {"entry_id": item["id"], "path": leaf_defs[DASHBOARD_LAYOUT_LEAF_ID]["path"], "status": item["evidence"]["status"]}
        for item in leaf_defs[DASHBOARD_LAYOUT_LEAF_ID]["entries"] if "evidence" in item and "layout" in item
    ],
    "forbidden_defaults": ["默认蓝紫渐变", "所有卡片一样大", "满屏圆角矩形", "过多颜色和图标", "模板化侧边栏+顶栏+四张 KPI 卡"]
})

dump("index/leaves.json", {"schema_version": "1.0.0", "knowledge_types": ["term", "pattern", "technique", "guideline", "parameter", "template", "platform-research"], "leaves": leaf_refs})

for domain_id, subdomains in domain_specs.items():
    subdomain_items = []
    for subdomain_id, title, description in subdomains:
        leaves = [x for x in leaf_refs if x["domain_id"] == domain_id and x["subdomain_id"] == subdomain_id]
        if subdomain_id in intent_defaults:
            intents = intent_defaults[subdomain_id]
        else:
            derived_intents = sorted({
                intent_id
                for leaf in leaves
                for intent_id in leaf.get("intent_ids", [])
            })
            intents = [(intent_id, "匹配", title) for intent_id in derived_intents] or [("explore", "探索", title)]
        intent_index_path = f"index/intents/{domain_id}/{subdomain_id}.json"
        subdomain_items.append({
            "subdomain_id": subdomain_id, "title": title, "description": description,
            "intent_index": intent_index_path, "leaf_count": len(leaves),
            "status": "published" if leaves else "skeleton"
        })
        dump(intent_index_path, {
            "schema_version": "1.0.0", "subdomain_id": subdomain_id,
            "domain_id": domain_id,
            "intents": [{"id": iid, "action": action, "object": obj, "leaf_refs": [x["leaf_id"] for x in leaf_refs if x["domain_id"] == domain_id and x["subdomain_id"] == subdomain_id and iid in x["intent_ids"]]} for iid, action, obj in intents]
        })
    dump(f"index/domains/{domain_id}.json", {"schema_version": "1.0.0", "domain_id": domain_id, "subdomains": subdomain_items})

# Add subdomain refs and leaf count to legacy package entries.
packages = json.loads((ROOT / "index/packages.json").read_text(encoding="utf-8"))
packages["schema_version"] = "2.0.0"
for package in packages["packages"]:
    domain_id = package["domain_id"]
    package["subdomain_index"] = f"index/domains/{domain_id}.json"
    package["leaf_count"] = sum(1 for x in leaf_refs if x["domain_id"] == domain_id)
    package["loading_policy"] = "progressive"
dump("index/packages.json", packages)

# Runtime index: small routing records only; leaf content stays out of the runtime hot path.
keywords = {
    "undo-window": ["撤销", "undo", "删除后恢复", "可逆操作", "撤销条", "倒计时"],
    "reverse-animation": ["反向动画", "归位", "删除动画", "恢复动画"],
    "flip-reentry": ["FLIP", "列表恢复", "原索引", "共享元素"],
    "motion-accessibility": ["aria", "读屏", "键盘", "减少动态", "prefers-reduced-motion"],
    "follow": ["跟随", "跟手", "速度跟随"], "threshold": ["阈值", "触发条件", "断开"], "snap": ["吸附", "锚点", "回弹"],
    "velocity-inheritance": ["速度继承", "释放速度", "摩擦"], "interruption": ["中断", "快速连点", "动画接管"],
    **{k: [v[0], k.replace('-', ' ')] for k, v in interaction_12.items()},
    **{k: [v[0], "dashboard", "后台"] for k, v in dashboard_entries.items()},
    **{k: [v[0], "组件", "AI 生成"] for k, v in components.items()},
    **{
        k: [v[0].replace("列表", ""), k.replace("-", " ")]
        for k, v in continuous_patterns.items()
    },
    **{
        k: [v[0].replace("列表", ""), k.replace("-", " ")]
        for k, v in advanced_interactions.items()
    },
    **{
        k: [v[0].replace("列表", ""), k.replace("-", " "), *v[2][:2]]
        for k, v in visual_effects.items()
    },
    **{
        k: [v[0], k.replace("-", " "), *v[2][:2]]
        for k, v in gsap_leaves.items()
    },
    "living-style-guide-preview": ["活样式指南", "Light", "Dark", "设计系统", "预览", "token"],
    # Explicit aliases keep the five new feeling-to-term patterns ahead of
    # generic motion leaves when the user describes the visible outcome.
    "checkbox-cascade": ["勾选联动", "复选框联动", "进度环", "数字滚动", "顶部背景", "checkbox cascade"],
    "stack-card-expand": ["叠卡展开", "卡片铺开", "卡片扇出", "卡片叠回", "stack card expand"],
    "snap-card-timeline": ["吸附卡画线", "吸附卡加画线", "时间线逐段绘制", "卡片停稳后画线", "卡片停稳后画时间线", "snap card timeline"],
    "inertial-wheel": ["惯性滚轮", "时间滚轮", "数值滚轮", "阻尼滚轮", "刻度吸附", "inertial wheel"],
    "radial-reveal-transition": ["圆形扩散转场", "圆形转场", "径向揭示", "点击点扩散", "页面圆形扩散", "radial reveal transition"],
    "submit-state-machine": ["提交状态", "保存按钮", "保存进度环", "保存转进度", "进度环打勾", "submit state machine"],
    "perspective-carousel": ["景随图换轮播", "卡片层叠轮播", "层叠轮播", "叠卡轮播", "卡片堆叠轮播", "perspective carousel"],
    "damped-bottom-sheet": ["阻尼弹性抽屉", "撕线弹出面板", "撕线下拉", "撕线下拉打开面板", "撕口下拉", "撕线面板", "撕口弹出", "tear line panel"],
    "edge-docked-fab": ["吸边悬浮球", "吸边悬浮球，释放后吸附", "贴边悬浮按钮", "edge docked fab"],
    "press-and-hold-confirm": ["按住蓄力确认", "按住按钮", "长按确认", "危险操作确认", "press and hold confirm"],
    "gsap-react-lifecycle": ["GSAP React 生命周期", "GSAP", "React 动画清理", "组件卸载清理", "ctx.revert", "useGSAP", "gsap react lifecycle"],
    "availability-patterns": ["高可用", "高可用模式", "故障转移", "RTO", "RPO", "availability-patterns", "high-availability"],
    "capacity-model": ["高并发", "并发容量", "容量模型", "RPS", "P95", "P99", "capacity-model", "high-concurrency"],
    "scaling-strategies": ["高扩展", "扩展策略", "水平扩展", "分片", "异步化", "scaling-strategies", "scalability"],
    "character-ip": ["角色 IP", "三视图", "周边", "一致性", "毛绒玩偶"],
    "gpui-desktop-web": ["GPUIX", "Metal", "DirectX", "Vulkan", "WebGPU", "WebGL2"],
    "gpui-mobile": ["GPUIX", "iOS", "Android", "移动端", "gpui-mobile"],
    "three-ui-catalog": ["ThreeUI", "Hero", "Backgrounds", "Three.js", "3D 组件"],
}
# Variants stay inside their authored leaf; publish identifiers, not bodies.
# Keep aliases local to the family so adding a Dashboard does not add a route.
dashboard_layout = leaf_defs[DASHBOARD_LAYOUT_LEAF_ID]
keywords[DASHBOARD_LAYOUT_LEAF_ID] = [
    *keywords[DASHBOARD_LAYOUT_LEAF_ID],
    *(alias for item in dashboard_layout["entries"]
      for alias in [item["id"], item["name"], *item.get("aliases", [])]),
]
routes = []
for ref in leaf_refs:
    route_keywords = [
        *keywords.get(ref["leaf_id"], []),
        ref["title"],
        ref["leaf_id"],
    ]
    deduplicated_keywords = []
    seen_keywords = set()
    for keyword in route_keywords:
        normalized = normalize_keyword(keyword)
        if normalized not in seen_keywords:
            seen_keywords.add(normalized)
            deduplicated_keywords.append(keyword)
    route = {
        "leaf_id": ref["leaf_id"], "title": ref["title"], "keywords": deduplicated_keywords,
        "path": ref["path"], "domain_id": ref["domain_id"], "subdomain_id": ref["subdomain_id"],
        "knowledge_type": ref["knowledge_type"], "entry_count": ref["entry_count"],
        "intent_ids": ref["intent_ids"], "scope": ref["scope"], "do_not_generalize": ref["do_not_generalize"]
    }
    if ref.get("provider"):
        route["provider"] = ref["provider"]
    routes.append(route)
dump("index/runtime.json", {
    "schema_version": "1.0.0", "index_type": "runtime-router", "generated_by": "scripts/bootstrap-progressive-content.py",
    "matching": {"normalization": ["lowercase", "unicode_nfkc"], "scoring": "token-overlap", "tie_break": "score_then_leaf_id"},
    "limits": root["loading_policy"], "routes": routes
})
print(f"generated {len(leaf_refs)} granular leaves")
