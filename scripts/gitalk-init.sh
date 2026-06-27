#!/bin/bash
# 自动为新文章创建 Gitalk Issues
# 用法: ./scripts/gitalk-init.sh <github_token>

GITHUB_TOKEN="$1"
OWNER="XianwuLin"
REPO="xianwulin.github.io"
SITE_URL="https://xianwulin.github.io"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "用法: $0 <github_token>"
  exit 1
fi

# 遍历 _site 目录中的所有 HTML 文件
find _site -name "*.html" | while read -r file; do
  # 从文件路径推导页面 URL（取前 50 字符作为 Gitalk ID）
  page_path=$(echo "$file" | sed "s|^_site||" | sed "s|/index.html$|/|" | sed "s|.html$|/|")
  id=$(echo "$page_path" | cut -c1-50)

  # 检查是否已有对应的 Issue
  existing=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$OWNER/$REPO/issues?labels=Gitalk,$id&state=open" \
    | jq 'length')

  if [ "$existing" -gt 0 ] 2>/dev/null; then
    echo "⏭  跳过（已有 Issue）: $page_path"
    continue
  fi

  # 从 HTML 文件中提取 <title> 作为 Issue 标题
  title=$(grep -oP '<title>\K[^<]+' "$file" | head -1)
  if [ -z "$title" ]; then
    title="${page_path}"
  fi

  # 创建 Issue
  response=$(curl -s -w "%{http_code}" -o /dev/null \
    -X POST "https://api.github.com/repos/$OWNER/$REPO/issues" \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"$title\",
      \"labels\": [\"Gitalk\", \"$id\"],
      \"body\": \"$SITE_URL$page_path\"
    }")

  if [ "$response" = "201" ]; then
    echo "✅ 已创建 Issue: $page_path"
  else
    echo "❌ 创建失败 (HTTP $response): $page_path"
  fi
done
