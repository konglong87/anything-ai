# Anything-AI 项目经验总结

> 记录项目开发过程中的重要经验教训

---

## 📝 2026-03-23：VitePress + GitHub Pages 部署经验

### 问题：页面"闪一下变404"

**现象**：
- 访问目录路径（如 `/prompts/`）→ 页面正常显示
- 1秒后 → 页面闪一下 → 显示404

**根本原因**：
1. VitePress 将 `README.md` 编译为 `README.html`（而非 `index.html`）
2. VitePress SPA 路由不会自动将目录路径重定向到 `README.html`
3. 导航链接使用目录路径（`/prompts/`），但路由映射只有 `prompts_readme.md`
4. 服务器返回 HTML → 页面正常 → VitePress JavaScript 路由接管 → 找不到匹配项 → 404

### 解决方案：三层防护机制

#### 1️⃣ 根目录首页
```javascript
// 直接复制 README.html 为 index.html，移除 SPA 路由脚本
const readmeContent = fs.readFileSync(fullPath, 'utf-8');
const fixedContent = readmeContent.replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/g, '');
fs.writeFileSync(indexPath, fixedContent, 'utf-8');
```

#### 2️⃣ 其他目录
```javascript
// 创建轻量级 index.html 重定向文件
const redirectHtml = `
<script>
  window.location.replace('./README.html');
</script>
`;
fs.writeFileSync(indexPath, redirectHtml, 'utf-8');
```

#### 3️⃣ 404.html 兜底
```javascript
// 在 404.html 中注入 URL 自动修复脚本
// 检测目录路径（以 / 结尾），自动重定向到 README.html
if (relativePath.endsWith('/')) {
  fetch(path + 'README.html', { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        window.location.replace(path + 'README.html');
      }
    });
}
```

#### 4️⃣ 导航链接配置
```typescript
// .vitepress/config.mts
nav: [
  { text: '提示词库', link: '/prompts/README.html' },  // ✅ 使用 README.html
  { text: '行业案例', link: '/roles/README.html' },
]
```

### 关键教训

**VitePress + GitHub Pages 的核心坑**：
- ❌ 目录路径不会自动补全 `.html` 后缀
- ❌ VitePress SPA 路由需要明确文件路径才能匹配
- ✅ 必须使用完整的文件路径（如 `README.html`）
- ✅ 需要构建后处理脚本来修复 URL 问题

**最佳实践**：
1. 所有导航和 sidebar 链接使用明确的 `README.html` 路径
2. 创建 `index.html` 重定向文件作为 fallback
3. 404.html 提供兜底机制
4. 根目录首页直接复制内容，避免重定向循环

### 修改的文件

1. `.github/workflows/deploy.yml` - 升级 Node.js 到 20，添加 enablement
2. `.vitepress/config.mts` - 导航链接使用 README.html
3. `package.json` - 添加 fix-urls 构建脚本
4. `scripts/fix-readme-urls.js` - URL 自动修复脚本

### 验证测试

```bash
# 所有 URL 都返回 200 OK
https://konglong87.github.io/anything-ai/ → 200 ✅
https://konglong87.github.io/anything-ai/prompts/ → 200 ✅
https://konglong87.github.io/anything-ai/roles/ → 200 ✅
https://konglong87.github.io/anything-ai/0-start-here/ → 200 ✅
```

---

## 🌍 2026-03-23：VitePress 多语言配置修复

### 问题：英文页面全部404

**现象**：
- 中文页面正常：`/README.html` → 200 OK
- 英文页面404：`/en/README.html` → 404
- 英文源文件使用 `.en.md` 后缀在根目录

**根本原因**：
1. VitePress 多语言配置要求英文源文件在独立的 `en/` 目录
2. 不能使用 `.en.md` 后缀混在根目录
3. `locales: { en: { link: '/en/' } }` 配置期望 `en/` 目录存在

### 解决方案：迁移英文文件到独立目录

#### 1️⃣ 创建迁移脚本
```javascript
// scripts/migrate-en-files.js
// 将 *.en.md 迁移到 en/*.md
const enFiles = findEnFiles(rootDir);
enFiles.forEach(file => {
  const targetPath = path.join(enDir, relativePath.replace('.en.md', '.md'));
  fs.copyFileSync(sourcePath, targetPath);
});
```

#### 2️⃣ 目录结构对比
```
修复前：                  修复后：
README.en.md              en/README.md
0-start-here/what-is-ai.en.md    en/0-start-here/what-is-ai.md
1-understand-ai/README.en.md     en/1-understand-ai/README.md
```

#### 3️⃣ 为英文目录创建重定向
```javascript
// scripts/fix-readme-urls.js 自动处理
// 为每个英文目录创建 index.html 重定向到 README.html
.vitepress/dist/en/index.html → 重定向到 README.html
.vitepress/dist/en/0-start-here/index.html → 重定向到 README.html
```

### 关键教训

**VitePress 多语言配置要求**：
- ❌ 不能使用 `.en.md` 后缀混在根目录
- ✅ 必须创建独立的语言目录（`en/`、`zh/` 等）
- ✅ `locales` 配置中的 `link` 要与目录名匹配
- ✅ 构建后需要为每个语言目录创建 index.html 重定向

**迁移步骤**：
1. 创建 `en/` 目录
2. 复制所有 `.en.md` 文件到 `en/` 目录（去掉 `.en` 后缀）
3. 运行 `npm run build` 触发 `fix-urls` 脚本
4. 验证英文页面是否正常访问

### 验证测试

```bash
# 英文页面全部返回 200 OK
https://konglong87.github.io/anything-ai/en/ → 200 ✅
https://konglong87.github.io/anything-ai/en/README.html → 200 ✅
https://konglong87.github.io/anything-ai/en/0-start-here/ → 200 ✅
https://konglong87.github.io/anything-ai/en/1-understand-ai/README.html → 200 ✅
```

### 修改的文件

1. 创建 `scripts/migrate-en-files.js` - 英文文件迁移脚本
2. 创建 `en/` 目录结构 - 77个英文文件
3. 更新索引文件 - `indexes/*`
4. 提交ID：`1a9225e`, `9c3823c`

---

## 🎯 项目核心原则

1. **系统学习，不要碎片化** - AI 知识体系庞大，需要系统学习
2. **实践出真知** - 看再多的教程不如自己试一次
3. **不要焦虑，不要盲从** - AI 距离 AGI 还很远，短时间不会替代人
4. **AI 会犯错，你要把关** - AI 不理解，只是在预测，验证关键信息

---

**最后更新**：2026-03-23