---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% assign conferences = site.data.publications | where: "category", "conference" | sort: "year" | reverse %}
{% assign journals = site.data.publications | where: "category", "journal" | sort: "year" | reverse %}
{% assign books = site.data.publications | where: "category", "book" | sort: "year" | reverse %}

<h2>Conference Papers</h2>
<ul>
{% for pub in conferences %}
  <li>
    <strong>{{ pub.title }}</strong><br>
    {{ pub.authors }}<br>
    <em>{{ pub.venue }}</em>, {{ pub.year }}<br>
    {% for link in pub.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>{% unless forloop.last %} · {% endunless %}
    {% endfor %}
  </li>
{% endfor %}
</ul>

<h2>Journal Articles</h2>
<ul>
{% for pub in journals %}
  <li>
    <strong>{{ pub.title }}</strong><br>
    {{ pub.authors }}<br>
    <em>{{ pub.venue }}</em>, {{ pub.year }}<br>
    {% for link in pub.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>{% unless forloop.last %} · {% endunless %}
    {% endfor %}
  </li>
{% endfor %}
</ul>

<h2>Books</h2>
<ul>
{% for pub in books %}
  <li>
    <strong>{{ pub.title }}</strong><br>
    {{ pub.authors }}<br>
    <em>{{ pub.venue }}</em>, {{ pub.year }}
  </li>
{% endfor %}
</ul>
