# BubbleStone DevLog

개인 기술 블로그 — [devlog.bubblestone.net](https://devlog.bubblestone.net)

## Stack

- **Astro** — 정적 사이트 생성 (SSR hybrid)
- **D3.js** — 기술 관계 다이어그램
- **Tailwind v4** — 스타일링
- **Giscus** — GitHub Discussions 기반 댓글
- **PM2 + Nginx** — 서버 실행

## 개발

```bash
npm install
npm run dev      # localhost:4321
npm run build
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 서버에 배포합니다.

## 글 작성

`src/content/posts/` 에 `.md` 파일 추가 후 push.

```md
---
title: "제목"
description: "한 줄 설명"
date: "2024-12-20"
tags: ["태그"]
techs: ["React"]
---

본문
```
