---
layout: default
title: Home
---

{% assign groups = "math,image,mediaTool" | split: "," %}
{% for g in groups %}
<h2>{{ g }}</h2>
<ul class="post-list">
  {% for post in site.categories[g] %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
  </li>
  {% endfor %}
</ul>
{% endfor %}
