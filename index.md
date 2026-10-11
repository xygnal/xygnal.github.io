---
layout: default
title: Home
---

<h1 class="visually-hidden">{{ site.title }} - {{ site.description }}</h1>

{% assign groups = "math,image,mediaTool" | split: "," %}
{% for g in groups %}
<h2>{{ g }}</h2>
<ul class="post-list">
  {% for post in site.categories[g] %}
  <li>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>
{% endfor %}
