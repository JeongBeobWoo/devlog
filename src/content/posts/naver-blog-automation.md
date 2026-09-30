---
title: "Playwright로 네이버 블로그 자동 발행 시스템 만들기"
description: "Claude API로 글을 생성하고, Playwright로 네이버 스마트에디터에 자동 발행하는 시스템을 구축한 과정과 삽질 기록"
date: "2024-12-01"
tags: ["자동화", "Python", "Playwright"]
techs: ["Python", "Playwright", "Claude API", "SQLite"]
---

## 왜 만들었나

네이버 블로그를 운영하면서 매번 글을 직접 쓰고 발행하는 게 번거로웠다. 키워드 조사부터 글 작성, 발행까지 자동화하면 어떨까 싶었다.

Claude API로 글을 생성하고, Playwright로 브라우저를 제어해서 네이버 스마트에디터에 직접 타이핑하는 방식으로 구현했다.

## 핵심 구조

```
keyword → Claude API → 글 생성 → Playwright → 네이버 발행
                ↑
        style_cache.json (기존 글 말투 학습)
```

전체 파이프라인은 세 단계다.

1. **keyword 분석** — 네이버 검색 광고 API로 검색량, 경쟁도 조회
2. **글 생성** — Claude Sonnet으로 2,000~2,500자 글 생성 (저품질 방지 지침 포함)
3. **자동 발행** — Playwright headless 브라우저로 에디터 조작

## 가장 어려웠던 부분: 에디터 DOM 구조

네이버 스마트에디터 3.0은 iframe이 없다. 일반 SPA 구조라 처음엔 `#mainFrame`을 찾다가 헤맸다.

실제 구조는 이렇다:

```
.se-component.se-documentTitle  ← 제목 영역
  └── .se-text-paragraph        ← contenteditable

.se-component.se-text           ← 본문 영역
  └── .se-text-paragraph        ← contenteditable
```

`page.click()` 대신 `bounding_box()`로 실제 좌표를 구해서 마우스 클릭을 해야 에디터가 정상 포커스됐다.

```python
box = title_el.bounding_box()
page.mouse.click(box['x'] + box['width'] / 2, box['y'] + 10)
```

## 저품질 방지 프롬프트

네이버 VIEW 탭은 E-E-A-T 기준으로 콘텐츠를 평가한다. AI 생성 글이 걸리는 패턴을 피하려면:

- 구체적 숫자 최소 3개 이상 (%, 원, 날짜)
- 의문형 / 반전형 / 공감형 문장 혼용
- "A는 B입니다" 3연속 금지
- 비교표 또는 계산 예시 1개

이 지침을 Claude 프롬프트에 명시적으로 넣으니 확연히 달라졌다.

## 결과

| 항목 | 수동 | 자동화 후 |
|------|------|-----------|
| 글 1편 시간 | ~2시간 | ~5분 |
| 말투 일관성 | 높음 | 기존 글 학습으로 유지 |
| 저품질 리스크 | 낮음 | 프롬프트 개선 후 낮음 |

전체 코드는 `/Users/beobwoo/workspace_naver_blog/` 에 있다.
