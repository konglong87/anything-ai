# 维护与更新

源码快照是只读导入产物，不直接编辑 upstream 或生成页面。

1. 确认上游完成 review 和提交，取得完整 40 位 SHA。
2. `npm run jargon:sync -- --repo /path/to/feeling-to-jargon --ref <full-sha>` 从 Git 对象读取，不包含工作区改动。
3. `npm run jargon:build` 重建场景、分类、覆盖清单、下载与 catalog。
4. `npm run test:jargon` 验证模型、来源、组合与复制语义；`npm run build` 检查站点。
5. 预览页面，检查桌面/移动/暗色、单条复制、分类合集、组合互斥、缺口边界和来源链接；确认后 commit/push。

正常构建只读此快照，绝不访问上游网络或自动追踪 main。快照文件 SHA 与 lock 不符会使构建失败。生成器只清理 generated.json 中自己拥有且已失效的文件。本站额外说明放在生成器或独立手写文档中，勿修改生成文件。

所有栏目/按钮的可复制内容消费 scripts/jargon/prompt-core.mjs，原始内容保留在 upstream 和网站源码快照下载中。新增 knowledge_type 要同时更新 scripts/jargon/labels.mjs 和 UI types.ts，并扩充测试。每个 leaf entry 用 <leaf_id>--<entry_id> 做稳定 ID。
