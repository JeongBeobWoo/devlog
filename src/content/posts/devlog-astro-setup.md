---
title: "Astro로 개인 기술 블로그 만들기 — 기술 맵 다이어그램 포함"
description: "devlog.bubblestone.net 구축기. Astro + D3.js로 기술 아이콘 연결 다이어그램을 만든 과정"
date: "2024-12-15"
tags: ["Astro", "블로그", "D3.js"]
techs: ["Astro", "TypeScript", "D3.js", "Tailwind", "Nginx"]
---

## 왜 Astro인가

기술 블로그를 만들기로 했을 때 선택지는 세 가지였다.

- **Next.js** — 기능이 많지만 블로그 하나에 너무 무겁다
- **Hugo / Jekyll** — 빠르지만 커스터마이징이 번거롭다
- **Astro** — 정적 사이트, MDX 지원, 필요할 때만 JS 포함

Astro의 Islands Architecture가 결정적이었다. D3.js 그래프 같은 인터랙티브 컴포넌트만 클라이언트에서 hydrate되고, 나머지는 순수 HTML로 나간다.

## Tech Map 구현

가장 재미있는 부분이었다. 기술들이 아이콘 노드로 표시되고, 화살표로 연결되며 화살표에 관계 설명이 적히는 다이어그램이다.

D3 force simulation을 사용했다:

```javascript
const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(120))
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(W / 2, H / 2))
  .force('collision', d3.forceCollide(45));
```

SVG `<marker>`로 화살표를 만들고, `linkLabel`로 관계 텍스트를 중간에 배치했다.

그룹별로 색을 다르게 — 프론트(인디고), 백엔드(에메랄드), 인프라(앰버), AI(핑크).

## 파일 구조

```
src/
  content/posts/    ← MDX 글
  components/
    TechGraph.astro ← D3 다이어그램
  layouts/
    BaseLayout.astro
    PostLayout.astro
  pages/
    index.astro     ← 메인 (최근 글 + 기술 맵 미리보기)
    posts/[slug]    ← 글 상세
    tech.astro      ← 기술 맵 전체
    tags/[tag]      ← 태그별 글
```

## SEO 설정

Astro sitemap 플러그인으로 `/sitemap-index.xml` 자동 생성. 각 페이지에 canonical URL, OG 태그, Twitter 카드 메타 포함.

```
site: 'https://devlog.bubblestone.net'
```

이 값 하나로 sitemap의 모든 URL이 절대 경로로 생성된다.
