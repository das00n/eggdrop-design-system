# 에그드랍 디자인 시스템 (스타일 가이드 문서) — 설계

- 날짜: 2026-06-24
- 상태: 승인됨 (설계 확정, 구현 계획 대기)
- 작성: 브레인스토밍 세션 결과

## 1. 목표

Claude Code와 claude.ai 채팅에서 UI 작업물을 만들 때 **일관된 스타일이 자동 적용**되도록, 스타일의 단일 정본(source of truth)을 만든다. 데이터 대시보드 중심. 우선 1개 스타일을 만들고, 나중에 테마로 확장 가능한 구조로 둔다.

## 2. 핵심 결정 요약

| 항목 | 결정 |
|---|---|
| 접근 방식 | 스타일 가이드 **문서** (컴포넌트 코드 라이브러리가 아님) |
| 범위 | 토큰 + 핵심 컴포넌트 6종 규칙 (B안) |
| 정본 위치 | **GitHub public 레포** `das00n/eggdrop-design-system` |
| 로컬 경로 | 각 머신에서 클론 → `C:\Users\wooji\design-system\` |
| 색 기준 | 블랙·화이트 기반 + 옐로우(주 포인트)·레드(강조) + 기능색 3종(보조) |
| 화면 성격 | 데이터 대시보드 중심 |
| 기술 형태 | CSS 변수(정본) + Tailwind preset 매핑 둘 다 |
| 자동 적용 | 독립 폴더 + 필요 시 "디자인 가이드 적용" 호출 (전역 주입 안 함) |

## 3. 아키텍처 — 다중 머신 접근성

GitHub public 레포를 정본으로 두고, 각 환경이 거기서 가져온다. (전역 CLAUDE.md의 관제탑 패턴과 동일: 클라우드는 로컬 파일을 못 보므로 GitHub 경유.)

```
GitHub: das00n/eggdrop-design-system  (public)   ← 정본
   │
   ├─ 머신 A: git clone → C:\Users\wooji\design-system\
   ├─ 머신 B: git clone → (다른 PC)
   ├─ claude.ai Project 지식: STYLE-GUIDE.md·tokens.css 업로드 (수정 시 재업로드)
   └─ 클라우드/폰: raw URL WebFetch 또는 checkout
```

동기화: 한 머신에서 수정 → `push`. 다른 머신은 `pull`, 채팅 Project는 재업로드. 변경 이력은 git에 남는다.

## 4. 폴더 / 파일 구성

```
eggdrop-design-system/
├─ STYLE-GUIDE.md        ← Claude가 읽는 메인 가이드 (규칙·예제·복붙 스니펫)
├─ tokens.css            ← CSS 변수 정본 (값의 단일 출처)
├─ tailwind.preset.js    ← tokens.css 값을 Tailwind 클래스로 매핑
├─ README.md             ← 사용법 (코드/채팅/클라우드 적용 방법)
└─ docs/superpowers/specs/  ← 이 설계 문서 보관
```

- 값의 정본은 `tokens.css`. `tailwind.preset.js`·`STYLE-GUIDE.md`는 이 값을 참조·설명.
- 확장 시: `themes/<이름>.css` 추가 (지금은 만들지 않음 — YAGNI).

## 5. 디자인 토큰

### 5.1 색

중립색 (블랙 → 화이트):

| 토큰 | hex | 용도 |
|---|---|---|
| `--c-ink` | #111111 | 기본 텍스트 / 다크 표면(사이드바) |
| `--c-gray-700` | #3F3F46 | 보조 텍스트 |
| `--c-gray-500` | #71717A | 라벨·힌트 |
| `--c-gray-300` | #D4D4D8 | 테두리 |
| `--c-gray-100` | #F4F4F5 | 옅은 표면(표 헤더·지표 카드) |
| `--c-white` | #FFFFFF | 기본 표면 |

포인트색:

| 토큰 | hex | 용도 | 위 텍스트색 |
|---|---|---|---|
| `--c-primary` (옐로우) | #FFC400 | 주요 액션·하이라이트 (화면당 1개 권장) | #3F2D00 |
| `--c-accent` (레드) | #E5322D | 강조·위험 | #FCEBEB |

기능색 (상태 — 대시보드 필수 최소 세트, 브랜드색 보조):

| 토큰 | hex | 연한 배경 / 진한 글자 |
|---|---|---|
| `--c-success` | #16A34A | #DCFCE7 / #14532D |
| `--c-warning` | #F59E0B | #FEF3C7 / #633806 |
| `--c-danger` | #E5322D (=accent 재사용) | #FEE2E2 / #7F1D1D |
| `--c-info` | #2563EB | #DBEAFE / #1E3A8A |

### 5.2 타이포

```
--font-sans: "Pretendard", -apple-system, "Segoe UI", "Malgun Gothic", sans-serif;
```
가중치: 400 regular / 500 medium / 700(숫자·강조). 숫자는 `font-variant-numeric: tabular-nums`.

| 토큰 | 크기 / 가중치 | 용도 |
|---|---|---|
| `text-metric` | 24px / 700 tabular | 지표 카드 숫자 |
| `text-h1` | 22px / 600 | 페이지 제목 |
| `text-h2` | 18px / 600 | 섹션 제목 |
| `text-h3` | 16px / 600 | 카드 제목 |
| `text-body` | 14px / 400 | 본문(기본) |
| `text-sm` | 13px / 400 | 표 셀·보조 |
| `text-caption` | 12px / 400 | 라벨·힌트(gray-500) |

### 5.3 간격 · 모서리 · 테두리 · 그림자

- 간격 (4px 배수): `space-1`=4 · `2`=8 · `3`=12 · `4`=16 · `6`=24 · `8`=32 · `12`=48
- 모서리: `radius-sm`=4 · `radius-md`=8 · `radius-lg`=12 · `radius-full`=999
- 테두리: 기본 `1px solid var(--c-gray-300)`
- 그림자: 평면+테두리 기본. 떠 있는 요소만 — `shadow-sm`(드롭다운) · `shadow-md`(모달). 그 외 미사용.

## 6. 핵심 컴포넌트 6종 규칙

1. **버튼** — primary=옐로우 배경/짙은 글자(화면당 1개 권장) · secondary=화이트+gray-300 테두리 · danger=레드/흰글자 · ghost=투명. 높이 36px, radius-md, weight 500.
2. **입력** — 라벨(caption/gray-500)을 필드 위에. 필드 높이 36px, gray-300 테두리, radius-md, 포커스 링 ink. select 동일.
3. **카드** — 화이트 배경 + gray-300 테두리 + radius-lg + 패딩 16px. 지표 카드 변형: gray-100 배경, 테두리 없음.
4. **표** — 헤더 gray-100 배경, 행 구분선 1px gray-300, 숫자 우측정렬 tabular-nums, 바깥 컨테이너 radius-lg.
5. **상태 배지** — pill(radius-full), 연한 배경 + 같은 계열 진한 글자. 정상=success · 대기=warning · 미마감/위험=danger · 마감=ink 배경+옐로우 글자.
6. **페이지 레이아웃** — 좌측 ink 사이드바(옐로우 로고·활성 항목 강조) + 화이트 본문, 상단에 지표 카드 행.

## 7. 자동 적용 / 사용법

- **Claude Code (로컬)**: "디자인 가이드 적용" → `STYLE-GUIDE.md` + `tokens.css`를 읽고 작업. 전역 CLAUDE.md엔 주입하지 않음(백엔드 세션 오염 방지). 필요 시 정본 경로를 가리키는 한 줄 포인터만 선택적으로 추가 가능.
- **claude.ai 채팅**: Project 하나 생성 → `STYLE-GUIDE.md`·`tokens.css`를 지식으로 업로드. 그 Project의 모든 채팅에 반영. 수정 시 재업로드.
- **클라우드/폰**: public raw URL을 WebFetch 하거나 레포 checkout.

## 8. 확장 (나중)

- 두 번째 스타일이 필요해지면 `themes/<이름>.css`로 토큰 세트를 추가하고, 작업 시 "<이름> 스타일로" 지정.
- 지금은 단일 스타일만 구현 (YAGNI).

## 9. 범위 밖 (이번에 안 함)

- 실제 React/Vue 컴포넌트 코드 라이브러리, npm 패키지화
- claude.ai/design (`/design-sync`) 연동 — 토큰이 자리 잡은 뒤 선택적으로 검토
- 다크모드 토큰, 접근성 풀 스펙, 다수 컴포넌트 — 확장 단계에서

## 10. 성공 기준

1. `tokens.css`·`tailwind.preset.js`·`STYLE-GUIDE.md`·`README.md`가 레포에 존재하고 서로 값이 일치한다.
2. GitHub public 레포 `das00n/eggdrop-design-system`에 푸시되어 다른 머신/클라우드에서 조회 가능하다.
3. 새 Claude Code 세션에서 "디자인 가이드 적용"으로 가이드를 읽어 위 6종 컴포넌트를 같은 톤으로 생성할 수 있다.
4. STYLE-GUIDE.md의 모든 토큰명·색·컴포넌트가 tokens.css에 실재한다(이름이 비지 않음).
