# 小武的博客

基于 [Jekyll](https://jekyllrb.com/) 搭建的个人博客。

## 本地运行

```bash
# 首次使用：安装依赖
bundle install
npm install

# 构建前端资源（修改了 JS/CSS 后需要执行）
npm run build

# 启动开发服务器（http://localhost:4000）
bundle exec jekyll serve
```

启动后浏览器打开 `http://localhost:4000`，修改文件会自动刷新。

## 写文章

在 `_posts/` 目录下新建 Markdown 文件，文件名格式：`YYYY-MM-DD-标题.md`。

```markdown
---
layout: post
title: "文章标题"
date: 2026-06-28
categories: 标签名
---

文章内容，支持 Markdown 语法。
```

### 分类标签

`categories` 字段即为文章标签。一篇文章可以有多个标签：

```yaml
# 单个标签
categories: 编程

# 多个标签
categories: [编程, JavaScript, 前端]
```

标签会自动汇聚在 [标签页](/tags.html) 中，按时间排序。

### 代码高亮

````markdown
```ruby
def hello
  puts "Hello World"
end
```
````

### 图片和附件

图片放在 `assets/images/` 目录下，文章中这样引用：

```markdown
![图片说明](/assets/images/example.png)
```

建议每篇文章的图片单独建一个子目录，便于管理：

```
assets/images/2026-06-28-hello/
├── screenshot.png
└── diagram.png
```

附件（PDF、压缩包等）也放在 `assets/` 下，用链接引用：

```markdown
[下载文件](/assets/files/document.pdf)
```

### 数学公式（MathJax 已启用）

```markdown
行内公式：\\(E = mc^2\\)
```

## 站点配置

编辑根目录下的 `_config.yml`：

| 配置项 | 说明 |
|--------|------|
| `title` | 站点标题 |
| `description` | 站点描述 |
| `logo` | 左上角 Logo 图片路径 |
| `rss` | RSS 订阅地址 |
| `theme_setting.nav_pages` | 右上角导航链接 |
| `theme_setting.code` | 启用代码高亮 |
| `theme_setting.math` | 启用数学公式 |
| `theme_setting.mermaid` | 启用 Mermaid 图表 |

## 页面布局

| 布局 | 用途 |
|------|------|
| `home` | 首页，展示文章列表 |
| `post` | 文章页 |
| `page` | 独立页面（关于、标签等） |
| `404` | 404 错误页 |

## 暗色模式

点击右上角的 🌙 按钮切换暗色/亮色模式，偏好会自动保存。
