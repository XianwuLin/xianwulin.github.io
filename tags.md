---
layout: page
title: 标签
---

<div class="tags-page">
{%- if site.categories.size > 0 -%}
  <nav class="tags__nav">
  {%- for category in site.categories -%}
    <a href="#{{ category[0] | slugify }}" class="tags__nav-link">{{ category[0] }}（{{ category[1].size }}）</a>
  {%- endfor -%}
  </nav>

  {%- for category in site.categories -%}
  <section class="tags__section" id="{{ category[0] | slugify }}">
    <h2 class="tags__title">{{ category[0] }}</h2>
    <ul class="tags__list">
    {%- assign posts = category[1] | sort: "date" | reverse -%}
    {%- for post in posts -%}
      <li class="tags__item">
        <time class="tags__time">{{ post.date | date: "%Y-%m-%d" }}</time>
        <a href="{{ post.url | relative_url }}" class="tags__link">{{ post.title }}</a>
      </li>
    {%- endfor -%}
    </ul>
  </section>
  {%- endfor -%}
{%- else -%}
  <p class="tags__empty">暂无标签。</p>
{%- endif -%}
</div>
