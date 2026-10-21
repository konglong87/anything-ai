---
title: "数字产品与交互设计（UI/UX）"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 数字产品与交互设计（UI/UX）

[返回专业提示词库](../README.md)

界面、交互和数字产品相关产物

共 **98 条**可浏览内容。待核验/待确认条目会单独标记，不进入执行组合。

## 场景与条目

- [前后对比滑块](/prompts/jargon/scenes/before-after-slider--before-after-slider.html) — 拖动分割线实时裁切两张图，位置在 0%–100%，不使用惯性。
- [阻尼弹性底部抽屉](/prompts/jargon/scenes/bottom-sheet--bottom-sheet.html) — 支持下拉、橡皮筋和多个锚点吸附。
- [Burst 点击爆散](/prompts/jargon/scenes/burst-feedback--burst-feedback.html) — 关键点击用 6–12 个短寿命粒子表达完成或奖励。
- [按钮变步进器](/prompts/jargon/scenes/button-stepper-morph--button-stepper-morph.html) — 加号按钮原位展开为减号、数量和加号，数量归零后收回。
- [3D 卡片翻面](/prompts/jargon/scenes/card-flip--card-flip.html) — 正反面围绕同一中心翻转，保持透视和背面隐藏。
- [勾选联动](/prompts/jargon/scenes/checkbox-cascade--checkbox-cascade.html) — 一次勾选按明确先后驱动顶部背景、进度环和数字滚动，多个反馈共享同一完成结果。
- [卡片错位/大图主导/非对称/层叠/留白/破格出血](/prompts/jargon/scenes/composition-patterns--composition-patterns.html) — 用比例、层级和安全区建立页面性格；每次只让少数元素破格。
- [Count 数字滚动](/prompts/jargon/scenes/count-animation--count-animation.html) — 数字按位滚动并在最后一段明显减速。
- [封面取色氛围光](/prompts/jargon/scenes/cover-color-ambient-glow--cover-color-ambient-glow.html) — 从封面图提取主色生成外围柔光，换图时用连续插值过渡而不是颜色突变。
- [圆柱卷收列表](/prompts/jargon/scenes/cylindrical-list--cylindrical-list.html) — 根据列表项距视区中心的距离插值旋转、缩放、亮度和透明度，让中心项突出、边缘项自然卷入。
- [阻尼弹性抽屉](/prompts/jargon/scenes/damped-bottom-sheet--damped-bottom-sheet.html) — Bottom Sheet 根据位移和速度在 closed/peek/half/full 锚点间吸附，越界呈 rubber band 回弹。
- [撕线弹出面板](/prompts/jargon/scenes/damped-bottom-sheet--tear-line-panel.html) — 面板顶部用虚线撕口和锯齿 SVG 表达可拖拽边界，下拉跟手映射撕裂进度，超过阈值弹簧展开，未达则回弹。
- [景深分层滚动](/prompts/jargon/scenes/depth-layer-scroll--depth-layer-scroll.html) — 把内容拆为前、中、后三层，按滚动进度驱动不同速度、模糊和亮度，形成可控景深。
- [动态弥散光晕边框](/prompts/jargon/scenes/diffused-glow-border--diffused-glow-border.html) — 用 conic-gradient 旋转描边，叠加 blur+opacity 呼吸背光，并用 mask 保留描边区域。
- [拖到目标吸入](/prompts/jargon/scenes/drag-to-absorb--drag-to-absorb.html) — 拖拽元素靠近目标后目标张开，松手时元素缩小并吸入目标中心。
- [Draw 成功勾选](/prompts/jargon/scenes/draw-success--draw-success.html) — 先画圆再画勾，用 SVG 描边过程表达成功。
- [吸边悬浮球](/prompts/jargon/scenes/edge-docked-fab--edge-docked-fab.html) — 毛玻璃悬浮球跟手拖拽，释放后吸附到最近左右边缘，闲置后缩成半透明贴边状态。
- [弹性微缩触觉反馈](/prompts/jargon/scenes/elastic-press-feedback--elastic-press-feedback.html) — 按钮按压缩到 0.96 并增加内阴影，释放时 Spring 轻微超调回 1，支持快速连点。
- [加号展开面板](/prompts/jargon/scenes/fab-panel-morph--fab-panel-morph.html) — FAB 原位形变为操作面板，中心点保持不变，关闭时逆向收回。
- [First Last Invert Play](/prompts/jargon/scenes/flip-reentry--flip.html) — 记录删除前后布局，撤销时把真实节点插回原索引，再播放反向变换。
- [占位与真实节点回插](/prompts/jargon/scenes/flip-reentry--placeholder.html) — 节点暂时移除后保留占位，撤销时按原索引插回真实节点。
- [流体胶囊形变](/prompts/jargon/scenes/fluid-capsule-morph--fluid-capsule-morph.html) — 胶囊按钮通过 FLIP/shared layout 形变为弹窗，圆角从 999px 过渡到 24px，内容延迟淡入并带遮罩。
- [跟随](/prompts/jargon/scenes/follow--follow.html) — 元素连续继承输入位置或速度，不瞬间跳到新状态。
- [菜单铺满全屏](/prompts/jargon/scenes/fullscreen-reveal-menu--fullscreen-reveal-menu.html) — 以触发按钮为中心用圆形揭示铺满全屏，菜单项交错进入。
- [GPUIX 桌面与 Web 平台研究](/prompts/jargon/scenes/gpui-desktop-web--gpui-desktop-web.html) **〔待核验 / 待确认〕** — 待核验的桌面/Web 平台适配记录；不得推广为所有 GPU UI 框架事实。
- [GPUIX 移动端平台研究](/prompts/jargon/scenes/gpui-mobile--gpui-mobile.html) **〔待核验 / 待确认〕** — 移动端支持状态需以官方仓库和版本为准；社区实现不能等同官方支持。
- [方格纸玻璃卡 Dashboard](/prompts/jargon/scenes/grid-glass-dashboard--grid-glass-dashboard.html) — 用 44px 方格纸做底，让半透明白玻璃卡透出底层网格，指标按数值形成阶梯。
- [分组侧边栏 Dashboard](/prompts/jargon/scenes/grouped-sidebar-dashboard--grouped-sidebar-dashboard.html) — 把导航拆成三组并用大留白分隔，主区用超大细体字、三组数字和横向比例条建立节奏。
- [GSAP Core](/prompts/jargon/scenes/gsap-core--gsap-core.html) **〔待核验 / 待确认〕** — tween、duration、easing、stagger 和可中断控制的基础适配。
- [GSAP 框架适配](/prompts/jargon/scenes/gsap-frameworks--gsap-frameworks.html) **〔待核验 / 待确认〕** — 在 Vue、Svelte 等框架中按生命周期创建和销毁上下文，隔离 SSR、hydration 与客户端动画。
- [GSAP 性能边界](/prompts/jargon/scenes/gsap-performance--gsap-performance.html) **〔待核验 / 待确认〕** — 把高频动效限制在合成属性，批量更新并减少布局读取，给复杂效果设置设备降级策略。
- [GSAP Plugins](/prompts/jargon/scenes/gsap-plugins--gsap-plugins.html) **〔待核验 / 待确认〕** — 按需使用 Flip、Draggable、Observer、SplitText 等插件，插件能力必须和交互目标一一对应。
- [GSAP React 生命周期](/prompts/jargon/scenes/gsap-react-lifecycle--gsap-react-lifecycle.html) **〔待核验 / 待确认〕** — 在 React 中用 useGSAP 或 gsap.context 管理选择器作用域、动画创建和 ctx.revert 清理。
- [GSAP ScrollTrigger](/prompts/jargon/scenes/gsap-scrolltrigger--gsap-scrolltrigger.html) **〔待核验 / 待确认〕** — 用 scrub、pin 和 start/end 将动画绑定到滚动进度，并避免把滚动逻辑散落在组件中。
- [GSAP Timeline](/prompts/jargon/scenes/gsap-timeline--gsap-timeline.html) **〔待核验 / 待确认〕** — 用时间线、label 和 position parameter 编排连续动效，保持顺序可读且可复用。
- [强对比视觉型](/prompts/jargon/scenes/high-contrast--high-contrast.html) — 一张主卡占据视觉中心，用高饱和对比和大数字建立层级。
- [图标变形](/prompts/jargon/scenes/icon-morph--icon-morph.html) — 菜单、播放等图标优先通过 SVG path 插值完成状态变化。
- [图卡内容型](/prompts/jargon/scenes/image-led-content--image-led-content.html) — 让真实图片成为主角，文字叠加且只保留一个强调色。
- [氛围沉浸型](/prompts/jargon/scenes/immersive-atmosphere--immersive-atmosphere.html) — 深色底、雾面渐变、玻璃卡片和轻微动态光斑。
- [惯性滚轮](/prompts/jargon/scenes/inertial-wheel--inertial-wheel.html) — 时间或数值滚轮在释放后继承速度惯性减速，越界时阻尼回弹并吸附到最近刻度。
- [信息层级](/prompts/jargon/scenes/information-hierarchy--information-hierarchy.html) — 先确定用户要做的决定，再按主次组织标题、数据、操作和辅助说明。
- [列表展开详情](/prompts/jargon/scenes/inline-detail-expand--inline-detail-expand.html) — 选中列表项就地展开，其余项顺势下移，不跳转详情页。
- [可中断与恢复](/prompts/jargon/scenes/interruption--interruption.html) — 动画中途再次输入时接管当前状态，而不是等待旧动画结束。
- [高级布局模式](/prompts/jargon/scenes/layout-patterns--layout-patterns.html) — 用错位、大图、非对称、层叠、留白和破格出血建立布局性格。
- [多彩错列布局](/prompts/jargon/scenes/layout-patterns--color-staggered-dashboard.html) — 非对称双列；大卡主位；多彩卡片；斜纹/实心状态
- [工业分区布局](/prompts/jargon/scenes/layout-patterns--industrial-zones-dashboard.html) — 右侧固定操作区；左侧状态筛选；玻璃表格；选中态联动
- [中轴观测布局](/prompts/jargon/scenes/layout-patterns--axial-observatory-dashboard.html) — 中央主视图；双侧信息栏；共享选中态；时间轴预览
- [玻璃点阵布局](/prompts/jargon/scenes/layout-patterns--glass-dot-matrix-dashboard.html) — 浅灰玻璃；点阵读数；月份切换；指标趋势联动
- [暖色三栏布局](/prompts/jargon/scenes/layout-patterns--warm-three-column-dashboard.html) **〔待核验 / 待确认〕** — 深浅分区；三栏控制台；模式与单位同步
- [液滴粘连拖拽](/prompts/jargon/scenes/liquid-adhesion-drag--liquid-adhesion-drag.html) — 拖动元素与原位之间生成液态粘连连接，距离增大时颈部收缩，超过阈值后断开并弹性回圆。
- [液态玻璃栏](/prompts/jargon/scenes/liquid-glass-bar--liquid-glass-bar.html) — 固定导航使用背景模糊、轻微折射和随滚动位移的高光，底色与文字对比度随背景亮度平滑调整。
- [Liquid 液态滑块](/prompts/jargon/scenes/liquid-slider--liquid-slider.html) — 轨道、滑钮和数值使用同一弹簧同步变化。
- [列表切换网格](/prompts/jargon/scenes/list-grid-flip--list-grid-flip.html) — 记录旧布局，切换布局后反转并播放到新位置，避免重载和跳变。
- [Light/Dark 活样式指南](/prompts/jargon/scenes/living-style-guide-preview--living-style-guide-preview.html) **〔待核验 / 待确认〕** — 用可直接打开的预览把色板、字体层级、组件状态和设计令牌映射到真实页面效果。
- [长按浮起预览](/prompts/jargon/scenes/long-press-preview--long-press-preview.html) — 长按列表项打开上下文预览，选中项浮起，菜单在局部空间内展开。
- [磁吸游标与滚动码表](/prompts/jargon/scenes/magnetic-cursor-odometer--magnetic-cursor-odometer.html) — 折线图拖拽时数据点磁吸，顶部数值使用 Odometer 按位滚动，拖拽、吸附和数值用 lerp+spring 联动。
- [极简数据型](/prompts/jargon/scenes/minimal-data--minimal-data.html) — 以灰阶和一个强调色组织数据，去网格线和多余标签。
- [Morph 汉堡变叉](/prompts/jargon/scenes/morph-icon--morph-icon.html) — 使用同路径或线段位移旋转完成图标变形。
- [撤销按钮可读标签](/prompts/jargon/scenes/motion-accessibility--undo-aria.html) — 按钮要读出操作和剩余时间，例如撤销删除，剩余 5 秒。
- [轻量状态播报](/prompts/jargon/scenes/motion-accessibility--undo-live.html) — 用 aria-live=polite 提示已删除、可撤销等关键状态。
- [景随图换轮播](/prompts/jargon/scenes/perspective-carousel--perspective-carousel.html) — 拖动距离或速度达到阈值后切换，中心项放大，侧边项透视缩小。
- [卡片层叠轮播](/prompts/jargon/scenes/perspective-carousel--stacked-card-carousel.html) — 三张卡片以缩放和 Y 轴偏移形成层叠，顶层跟随拖拽并轻微旋转，达到距离或速度阈值后飞出，下层补位。
- [按住蓄力确认](/prompts/jargon/scenes/press-and-hold-confirm--press-and-hold-confirm.html) — 按住危险操作按钮达到 800–1200ms 才确认，未满松手或移动超限则取消。
- [弧形快捷菜单](/prompts/jargon/scenes/radial-menu--radial-menu.html) — 长按悬浮按钮展开弧形子菜单，子项沿弧线交错弹出并支持边缘翻转。
- [圆形扩散转场](/prompts/jargon/scenes/radial-reveal-transition--radial-reveal-transition.html) — 从真实点击位置捕获圆心，以 clip-path circle 扩散覆盖屏幕，完全覆盖后再显示新页面内容。
- [沿原路径反向归位](/prompts/jargon/scenes/reverse-animation--reverse-path.html) — 撤销时沿删除动画的反方向回到原位置，而不是重新淡入。
- [归位确认高亮](/prompts/jargon/scenes/reverse-animation--reentry-highlight.html) — 元素回到原位后增加短暂高亮或脉冲，确认它确实回来了。
- [减少动态降级](/prompts/jargon/scenes/reverse-animation--reduced-motion.html) — 减少动态时保留进度、状态和结果，不强制播放位移动画。
- [Ripple 水波按钮](/prompts/jargon/scenes/ripple-button--ripple-button.html) — 从真实触点向最远角扩散水波，不把点击中心固定在控件中心。
- [旋钮转盘](/prompts/jargon/scenes/rotary-knob--rotary-knob.html) — 拖动或用键盘旋转旋钮，释放后吸附到最近刻度，中心数值同步变化。
- [顶栏随滚动收起](/prompts/jargon/scenes/scroll-header-collapse--scroll-header-collapse.html) — 滚动进度驱动搜索栏和顶栏收缩，反向滚动恢复。
- [搜索框展开](/prompts/jargon/scenes/search-expand--search-expand.html) — 图标与输入框共用容器，展开后自动聚焦，关闭时沿原路径收回。
- [分段进度条](/prompts/jargon/scenes/segmented-progress--segmented-progress.html) — 按住暂停，点击左右区域切换上一项或下一项，进度与内容同步。
- [共享元素无缝展开](/prompts/jargon/scenes/shared-element-expand--shared-element-expand.html) — 列表卡片到详情页使用同一 layoutId，图片、标题和容器连续缩放，背景遮罩淡入，避免跳变。
- [单深色单强调色 Dashboard](/prompts/jargon/scenes/single-dark-accent-dashboard--single-dark-accent-dashboard.html) — 整页只保留一条深色侧边栏和一个强调色，当前项、主按钮和命中图表共享同一强调色。
- [Shimmer 骨架落位](/prompts/jargon/scenes/skeleton-shimmer--skeleton-shimmer.html) — 骨架尺寸与真实内容一致，内容到达后平滑替换。
- [滑动确认组件](/prompts/jargon/scenes/slide-to-confirm--slide-to-confirm.html) — 滑块超过 80% 才确认，不足松手则弹回，确认只触发一次。
- [吸附](/prompts/jargon/scenes/snap--snap.html) — 松手后把连续输入收敛到明确落点。
- [吸附卡加画线](/prompts/jargon/scenes/snap-card-timeline--snap-card-timeline.html) — 卡片先减速吸附到最近目标，停稳后时间线再从起点逐段绘制到对应卡片位置。
- [Spring 按压回弹](/prompts/jargon/scenes/spring-press--spring-press.html) — 按下缩到 0.96–0.98，松手用弹簧回到 1 并允许 1.02–1.04 的轻微过冲。
- [物理弹簧交错流](/prompts/jargon/scenes/spring-stagger-flow--spring-stagger-flow.html) — 列表子项按 index*0.03–0.06s 交错，从 y:20、opacity:0 进入并带轻微 spring。
- [Squash 弹性开关](/prompts/jargon/scenes/squash-toggle--squash-toggle.html) — 开关起步横向拉伸、纵向压缩，再回到正常比例。
- [Stack 卡片抽走](/prompts/jargon/scenes/stack-card--stack-card.html) — 抽走前卡时露出后卡的缩放和位移层级。
- [叠卡展开](/prompts/jargon/scenes/stack-card-expand--stack-card-expand.html) — 叠放卡片点击或下滑后扇出成完整铺排，再沿原空间路径叠回，展开期间锁定下方卡片误触。
- [提交状态反馈](/prompts/jargon/scenes/submit-state-machine--submit-state-machine.html) — 按钮容器固定，通过状态机切换 loading、success 和 result，避免按钮位移。
- [保存按钮变进度环](/prompts/jargon/scenes/submit-state-machine--save-progress-ring.html) — 胶囊保存按钮点击后收缩为正圆，文字淡出并在同一容器内绘制进度环，完成后画勾并展开为已保存。
- [标签指示条](/prompts/jargon/scenes/tab-indicator-spring--tab-indicator-spring.html) — 指示条先拉向新位置，再收缩归位，轻微超调但不影响点击判断。
- [ThreeUI 组件目录研究](/prompts/jargon/scenes/three-ui-catalog--three-ui-catalog.html) **〔待核验 / 待确认〕** — 目录分类用于检索组件，不代表所有组件都适合生产环境。
- [阈值](/prompts/jargon/scenes/threshold--threshold.html) — 达到位移、速度或双条件后才触发状态切换。
- [3D 倾斜光影面板](/prompts/jargon/scenes/tilt-light-panel--tilt-light-panel.html) — 监听 pointermove/touchmove 计算 rotateX/rotateY，最大倾斜 8–12°，叠加随指针移动的径向高光，松手用 Spring 回正。
- [底色/强调色/层级/材质/主角五变量](/prompts/jargon/scenes/token-system--token-system.html) — Dashboard 的审美方向主要由底色、强调色、布局层级、材质和内容主角决定。
- [暗底明度分层 Dashboard](/prompts/jargon/scenes/tonal-dark-dashboard--tonal-dark-dashboard.html) — 近黑底上只用明度区分卡片层级，不画描边；主读数放大，日期用圆点阵列表达。
- [可逆操作时间窗口](/prompts/jargon/scenes/undo-window--undo-window.html) — 删除后保留一段明确的可撤销时间，让用户有机会反悔。
- [线性进度反馈](/prompts/jargon/scenes/undo-window--progress-feedback.html) — 进度条或进度环的完成时间与撤销窗口完全一致。
- [聚焦暂停窗口](/prompts/jargon/scenes/undo-window--pause-on-focus.html) — 用户悬停或键盘聚焦撤销控件时暂停倒计时。
- [速度继承](/prompts/jargon/scenes/velocity-inheritance--velocity-inheritance.html) — 松手后继续沿当前速度运动，再减速并吸附。
- [暖调留白型](/prompts/jargon/scenes/warm-minimal--warm-minimal.html) — 奶油底色、单一黄色强调、细边框和弱阴影，保留呼吸感。
- [Dashboard 审美 Skill](/prompts/jargon/scenes/template--dashboard-style-system.html) — 选择一个方向，展开共享规范，得到完整可复制模板。

[下载本领域合集（TXT）](/jargon/collections/digital-product-uiux.txt)

## 原始领域包

以下为旧版聚合包或草稿，保留原文便于追溯，不重复统计为新模板。

- [网页 UI/UX 需求澄清术语包：旧版聚合原文](../reference/terms--uiux.md)
