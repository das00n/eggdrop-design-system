# 에그드랍 디자인 시스템 (스타일 가이드) 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Claude Code·채팅·클라우드에서 일관되게 적용할 수 있는 단일 정본 스타일 가이드(토큰 + 핵심 컴포넌트 6종 규칙)를 만들어 GitHub public 레포로 게시한다.

**Architecture:** `tokens.css`(값의 정본) → `tailwind.preset.js`(동일 값 매핑) + `STYLE-GUIDE.md`(규칙·예제) + `README.md`(사용법). 작업 디렉터리 `C:\Users\wooji\design-system\`(이미 git init 완료)에서 만들고, `gh`로 public 레포 `das00n/eggdrop-design-system`를 만들어 푸시한다.

**Tech Stack:** CSS custom properties, Tailwind preset (CommonJS), Markdown, git, GitHub CLI(`gh`).

**Note:** 정적 설정·문서 프로젝트라 단위 테스트 대신 **검증 단계**(파일 파싱·토큰 일치 grep·raw URL 접근)로 각 산출물을 확인한다. 모든 명령은 `C:\Users\wooji\design-system`에서 실행. 커밋 메시지 끝에 `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` 한 줄을 포함한다.

---

## File Structure

```
eggdrop-design-system/   (= C:\Users\wooji\design-system)
├─ tokens.css            ← Task 1 · CSS 변수 정본
├─ tailwind.preset.js    ← Task 2 · 동일 값 Tailwind 매핑
├─ STYLE-GUIDE.md        ← Task 3 · Claude가 읽는 메인 가이드
├─ README.md             ← Task 4 · 사용법
├─ scripts/check-tokens.sh ← Task 5 · 토큰 일치 검증
└─ docs/superpowers/     ← spec·plan (이미 존재)
```

---

## Task 1: tokens.css (값의 정본)

**Files:**
- Create: `C:\Users\wooji\design-system\tokens.css`

- [ ] **Step 1: 파일 작성**

```css
/* 에그드랍 디자인 시스템 — 토큰 정본. 값 변경은 항상 이 파일에서. */
:root {
  /* ===== Color · Neutral (블랙 → 화이트) ===== */
  --c-ink: #111111;        /* 기본 텍스트 / 다크 표면(사이드바) */
  --c-gray-700: #3F3F46;   /* 보조 텍스트 */
  --c-gray-500: #71717A;   /* 라벨·힌트 */
  --c-gray-300: #D4D4D8;   /* 테두리 */
  --c-gray-100: #F4F4F5;   /* 옅은 표면(표 헤더·지표 카드) */
  --c-white: #FFFFFF;      /* 기본 표면 */

  /* ===== Color · Brand accent ===== */
  --c-primary: #FFC400;     /* 옐로우 — 주요 액션·하이라이트 */
  --c-primary-ink: #3F2D00; /* primary 배경 위 텍스트 */
  --c-accent: #E5322D;      /* 레드 — 강조 */
  --c-accent-ink: #FCEBEB;  /* accent 배경 위 텍스트 */

  /* ===== Color · Functional (status, 보조) ===== */
  --c-success: #16A34A; --c-success-bg: #DCFCE7; --c-success-ink: #14532D;
  --c-warning: #F59E0B; --c-warning-bg: #FEF3C7; --c-warning-ink: #633806;
  --c-danger:  #E5322D; --c-danger-bg:  #FEE2E2; --c-danger-ink:  #7F1D1D;
  --c-info:    #2563EB; --c-info-bg:    #DBEAFE; --c-info-ink:    #1E3A8A;

  /* ===== Typography ===== */
  --font-sans: "Pretendard", -apple-system, "Segoe UI", "Malgun Gothic", sans-serif;
  /* font 단축속성: `font: var(--text-h2)` 형태로 사용. 숫자엔 font-variant-numeric: tabular-nums 별도 적용 */
  --text-metric: 700 24px/1.2 var(--font-sans);
  --text-h1: 600 22px/1.3 var(--font-sans);
  --text-h2: 600 18px/1.4 var(--font-sans);
  --text-h3: 600 16px/1.4 var(--font-sans);
  --text-body: 400 14px/1.6 var(--font-sans);
  --text-sm: 400 13px/1.5 var(--font-sans);
  --text-caption: 400 12px/1.4 var(--font-sans);

  /* ===== Spacing (4px scale) ===== */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px;

  /* ===== Radius ===== */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-full: 999px;

  /* ===== Border ===== */
  --border-default: 1px solid var(--c-gray-300);

  /* ===== Shadow (떠 있는 요소만) ===== */
  --shadow-sm: 0 1px 3px rgba(17,17,17,.10);  /* 드롭다운 */
  --shadow-md: 0 8px 24px rgba(17,17,17,.16); /* 모달 */
}
```

- [ ] **Step 2: CSS 유효성 검증**

Run: `node -e "const c=require('fs').readFileSync('tokens.css','utf8'); const o=(c.match(/{/g)||[]).length, x=(c.match(/}/g)||[]).length; if(o!==x) throw new Error('중괄호 불일치 '+o+'/'+x); if(!c.includes('--c-primary: #FFC400')) throw new Error('primary 토큰 없음'); console.log('OK tokens.css 중괄호',o,'쌍');"`
Expected: `OK tokens.css 중괄호 1 쌍`

- [ ] **Step 3: 커밋**

```bash
git add tokens.css
git -c user.name="wooji" -c user.email="woojin.jeon415@gmail.com" commit -m "토큰 정본 tokens.css 추가

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: tailwind.preset.js (동일 값 매핑)

**Files:**
- Create: `C:\Users\wooji\design-system\tailwind.preset.js`

- [ ] **Step 1: 파일 작성**

```js
/** 에그드랍 디자인 시스템 — Tailwind preset. 값은 tokens.css와 동일. */
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        gray: { 100: '#F4F4F5', 300: '#D4D4D8', 500: '#71717A', 700: '#3F3F46' },
        primary: { DEFAULT: '#FFC400', ink: '#3F2D00' },
        accent:  { DEFAULT: '#E5322D', ink: '#FCEBEB' },
        success: { DEFAULT: '#16A34A', bg: '#DCFCE7', ink: '#14532D' },
        warning: { DEFAULT: '#F59E0B', bg: '#FEF3C7', ink: '#633806' },
        danger:  { DEFAULT: '#E5322D', bg: '#FEE2E2', ink: '#7F1D1D' },
        info:    { DEFAULT: '#2563EB', bg: '#DBEAFE', ink: '#1E3A8A' },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'Segoe UI', 'Malgun Gothic', 'sans-serif'],
      },
      fontSize: {
        metric:  ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        h1:      ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        h2:      ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        h3:      ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        body:    ['14px', { lineHeight: '1.6' }],
        sm:      ['13px', { lineHeight: '1.5' }],
        caption: ['12px', { lineHeight: '1.4' }],
      },
      spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px', 12: '48px' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', full: '999px' },
      boxShadow: {
        sm: '0 1px 3px rgba(17,17,17,.10)',
        md: '0 8px 24px rgba(17,17,17,.16)',
      },
    },
  },
};
```

- [ ] **Step 2: JS 로드 검증**

Run: `node -e "const p=require('./tailwind.preset.js'); if(p.theme.extend.colors.primary.DEFAULT!=='#FFC400') throw new Error('primary 불일치'); console.log('OK preset 로드, primary', p.theme.extend.colors.primary.DEFAULT);"`
Expected: `OK preset 로드, primary #FFC400`

- [ ] **Step 3: 커밋**

```bash
git add tailwind.preset.js
git -c user.name="wooji" -c user.email="woojin.jeon415@gmail.com" commit -m "Tailwind preset 추가 (tokens.css 매핑)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: STYLE-GUIDE.md (Claude가 읽는 메인 가이드)

**Files:**
- Create: `C:\Users\wooji\design-system\STYLE-GUIDE.md`

- [ ] **Step 1: 파일 작성**

````markdown
# 에그드랍 디자인 시스템 — 스타일 가이드

이 문서는 Claude가 UI를 만들 때 읽고 그대로 적용하는 규칙이다. 값의 정본은 `tokens.css`이며, 이 문서의 모든 색·토큰·컴포넌트는 거기에 실재한다. Tailwind를 쓰면 `tailwind.preset.js`를 preset으로 불러 같은 클래스명을 쓴다.

## 적용 방법
- 화면은 **데이터 대시보드** 톤: 평면 + 1px 테두리, 그림자 최소, 정보 밀도 높게.
- 색: 블랙·화이트 기반, **옐로우(주 포인트, 화면당 주요 액션 1개)**, **레드(강조·위험)**, 상태는 기능색.
- 폰트: Pretendard. 숫자는 `tabular-nums`.

## 색 (tokens.css 기준)

중립색: `--c-ink #111111`(텍스트/사이드바) · `--c-gray-700 #3F3F46`(보조텍스트) · `--c-gray-500 #71717A`(라벨) · `--c-gray-300 #D4D4D8`(테두리) · `--c-gray-100 #F4F4F5`(옅은표면) · `--c-white #FFFFFF`.

포인트: `--c-primary #FFC400`(주요 액션, 위 글자 `--c-primary-ink #3F2D00`) · `--c-accent #E5322D`(강조, 위 글자 `--c-accent-ink #FCEBEB`).

기능색(배경/글자 쌍): success `#16A34A` / bg `#DCFCE7` / ink `#14532D` · warning `#F59E0B` / `#FEF3C7` / `#633806` · danger `#E5322D` / `#FEE2E2` / `#7F1D1D` · info `#2563EB` / `#DBEAFE` / `#1E3A8A`.

> 색 위 글자는 항상 같은 계열의 ink 값을 쓴다(검정·회색 직접 쓰지 않음).

## 타이포
`--text-metric`(24/700·tabular, 지표 숫자) · `--text-h1`(22/600) · `--text-h2`(18/600) · `--text-h3`(16/600) · `--text-body`(14/400, 기본) · `--text-sm`(13/400, 표) · `--text-caption`(12/400, 라벨).

## 간격·모서리·테두리·그림자
간격 4px 배수(`--space-1`=4 … `--space-12`=48). 모서리 `--radius-sm`4·`-md`8·`-lg`12·`-full`999. 테두리 기본 `1px solid var(--c-gray-300)`. 그림자는 떠 있는 요소만(`--shadow-sm` 드롭다운, `--shadow-md` 모달).

## 컴포넌트 6종

### 1. 버튼
- primary(옐로우, 화면당 1개 권장) · secondary(화이트+테두리) · danger(레드) · ghost(투명). 높이 36px, `radius-md`, weight 500.

CSS 변수:
```html
<button style="background:var(--c-primary);color:var(--c-primary-ink);border:none;height:36px;padding:0 16px;border-radius:var(--radius-md);font:var(--text-sm);font-weight:500;">발주 확정</button>
<button style="background:var(--c-white);color:var(--c-ink);border:var(--border-default);height:36px;padding:0 16px;border-radius:var(--radius-md);font:var(--text-sm);font-weight:500;">취소</button>
<button style="background:var(--c-accent);color:var(--c-accent-ink);border:none;height:36px;padding:0 16px;border-radius:var(--radius-md);font:var(--text-sm);font-weight:500;">삭제</button>
```
Tailwind: `class="h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-ink"` / `bg-white text-ink border border-gray-300` / `bg-accent text-accent-ink`.

### 2. 입력
- 라벨(`text-caption`, gray-500)을 필드 위에. 필드 높이 36px, gray-300 테두리, `radius-md`, 포커스 링 ink.
```html
<label style="font:var(--text-caption);color:var(--c-gray-500);">매장명</label>
<input style="height:36px;padding:0 10px;border:var(--border-default);border-radius:var(--radius-md);font:var(--text-body);" />
```
Tailwind: `<label class="text-caption text-gray-500">` + `<input class="h-9 px-2.5 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-ink">`.

### 3. 카드
- 화이트 배경 + gray-300 테두리 + `radius-lg` + 패딩 16px. 지표 카드 변형: gray-100 배경, 테두리 없음, 숫자 `text-metric`.
```html
<div style="background:var(--c-gray-100);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);">
  <div style="font:var(--text-caption);color:var(--c-gray-500);">오늘 매출</div>
  <div style="font:var(--text-metric);font-variant-numeric:tabular-nums;color:var(--c-ink);">₩4,820,000</div>
</div>
```
Tailwind 지표 카드: `class="bg-gray-100 rounded-md p-4"` + 숫자 `class="text-metric tabular-nums text-ink"`.

### 4. 표
- 헤더 gray-100 배경, 행 구분선 1px gray-300, 숫자 우측정렬 `tabular-nums`, 바깥 컨테이너 `radius-lg`.
```html
<div style="border:var(--border-default);border-radius:var(--radius-lg);overflow:hidden;">
  <table style="width:100%;border-collapse:collapse;font:var(--text-sm);">
    <thead><tr style="background:var(--c-gray-100);text-align:left;">
      <th style="padding:10px 14px;color:var(--c-gray-700);font-weight:500;">매장</th>
      <th style="padding:10px 14px;color:var(--c-gray-700);font-weight:500;text-align:right;">매출</th>
    </tr></thead>
    <tbody><tr style="border-top:var(--border-default);">
      <td style="padding:10px 14px;">강남본점</td>
      <td style="padding:10px 14px;text-align:right;font-variant-numeric:tabular-nums;">4,820,000</td>
    </tr></tbody>
  </table>
</div>
```

### 5. 상태 배지
- pill(`radius-full`), 연한 배경 + 같은 계열 진한 글자. 정상=success · 대기=warning · 미마감/위험=danger · 마감=ink 배경+옐로우 글자.
```html
<span style="background:var(--c-success-bg);color:var(--c-success-ink);font:var(--text-caption);font-weight:500;padding:3px 10px;border-radius:var(--radius-full);">정상</span>
<span style="background:var(--c-warning-bg);color:var(--c-warning-ink);font:var(--text-caption);font-weight:500;padding:3px 10px;border-radius:var(--radius-full);">대기</span>
<span style="background:var(--c-danger-bg);color:var(--c-danger-ink);font:var(--text-caption);font-weight:500;padding:3px 10px;border-radius:var(--radius-full);">미마감</span>
<span style="background:var(--c-ink);color:var(--c-primary);font:var(--text-caption);font-weight:500;padding:3px 10px;border-radius:var(--radius-full);">마감</span>
```

### 6. 페이지 레이아웃
- 좌측 ink 사이드바(옐로우 로고·활성 항목 강조) + 화이트 본문, 상단에 지표 카드 행.
```html
<div style="display:flex;min-height:100vh;">
  <aside style="width:200px;background:var(--c-ink);color:var(--c-white);padding:var(--space-4) var(--space-3);">
    <div style="font-weight:700;color:var(--c-primary);margin-bottom:var(--space-4);">EGGDROP</div>
    <a style="display:block;background:#27272A;padding:6px 10px;border-radius:var(--radius-sm);">대시보드</a>
    <a style="display:block;color:#A1A1AA;padding:6px 10px;">매출</a>
  </aside>
  <main style="flex:1;background:var(--c-white);padding:var(--space-4);">
    <h1 style="font:var(--text-h1);">매장 일일 관리</h1>
  </main>
</div>
```

## 확장
두 번째 스타일이 필요하면 `themes/<이름>.css`로 토큰 세트를 추가하고 "<이름> 스타일로"라고 지정한다. 지금은 단일 스타일만 있다.
````

- [ ] **Step 2: 커밋**

```bash
git add STYLE-GUIDE.md
git -c user.name="wooji" -c user.email="woojin.jeon415@gmail.com" commit -m "메인 스타일 가이드 STYLE-GUIDE.md 추가

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: README.md (사용법)

**Files:**
- Create: `C:\Users\wooji\design-system\README.md`

- [ ] **Step 1: 파일 작성**

````markdown
# eggdrop-design-system

에그드랍 UI 작업물(데이터 대시보드 중심)에 일관 스타일을 적용하기 위한 단일 정본 스타일 가이드.

- `tokens.css` — 값의 정본 (CSS 변수)
- `tailwind.preset.js` — 동일 값 Tailwind 매핑
- `STYLE-GUIDE.md` — Claude가 읽는 규칙·예제
- `docs/superpowers/` — 설계(spec)·계획(plan)

## 사용법

### Claude Code (로컬)
이 레포를 클론한 뒤, UI 작업 시 다음과 같이 지시한다:
> "디자인 가이드 적용" — `STYLE-GUIDE.md`와 `tokens.css`를 읽고 그 규칙대로 만든다.

전역 CLAUDE.md엔 주입하지 않는다(백엔드 세션 오염 방지). 필요하면 정본 경로를 가리키는 한 줄 포인터만 선택적으로 둔다.

### claude.ai 채팅
claude.ai에서 Project를 하나 만들고 `STYLE-GUIDE.md`·`tokens.css`를 지식으로 업로드한다. 그 Project의 모든 채팅에 반영된다. 가이드를 수정하면 재업로드한다.

### 클라우드 / 폰
public raw URL을 WebFetch 하거나 레포를 checkout 한다.
예: `https://raw.githubusercontent.com/das00n/eggdrop-design-system/master/STYLE-GUIDE.md`

## Tailwind 연동
```js
// tailwind.config.js
module.exports = { presets: [require('eggdrop-design-system/tailwind.preset.js')] };
```

## 수정·확장
값을 바꿀 땐 항상 `tokens.css`를 고치고 `tailwind.preset.js`를 같은 값으로 맞춘다. 새 스타일은 `themes/<이름>.css`로 추가한다. 변경 후 `git push`, 다른 머신은 `pull`, 채팅 Project는 재업로드.
````

- [ ] **Step 2: 커밋**

```bash
git add README.md
git -c user.name="wooji" -c user.email="woojin.jeon415@gmail.com" commit -m "README 사용법 추가

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: 토큰 일치 검증 스크립트

**Files:**
- Create: `C:\Users\wooji\design-system\scripts\check-tokens.sh`

이 스크립트는 STYLE-GUIDE.md에 등장하는 토큰명이 모두 tokens.css에 실재하는지, 그리고 preset의 primary가 tokens.css와 일치하는지 확인한다 (spec 성공기준 #4).

- [ ] **Step 1: 파일 작성**

```bash
#!/usr/bin/env bash
# STYLE-GUIDE.md의 모든 --c-*/--text-*/--radius-*/--space-* 토큰이 tokens.css에 정의돼 있는지 검증
set -euo pipefail
cd "$(dirname "$0")/.."

missing=0
# STYLE-GUIDE.md에서 var(--xxx) 로 참조된 토큰 추출
for tok in $(grep -oE 'var\(--[a-z0-9-]+\)' STYLE-GUIDE.md | sed -E 's/var\((--[a-z0-9-]+)\)/\1/' | sort -u); do
  if ! grep -q "^[[:space:]]*$tok:" tokens.css; then
    echo "MISSING in tokens.css: $tok"
    missing=1
  fi
done

# preset primary 일치 확인
node -e "const p=require('./tailwind.preset.js'); const fs=require('fs'); const css=fs.readFileSync('tokens.css','utf8'); const m=css.match(/--c-primary:\s*(#[0-9A-Fa-f]{6})/)[1]; if(p.theme.extend.colors.primary.DEFAULT.toUpperCase()!==m.toUpperCase()){console.error('preset/tokens primary 불일치',p.theme.extend.colors.primary.DEFAULT,m);process.exit(1);} console.log('preset/tokens primary 일치',m);"

if [ "$missing" -ne 0 ]; then
  echo "검증 실패: tokens.css에 없는 토큰이 있음"
  exit 1
fi
echo "OK: STYLE-GUIDE 토큰 전부 tokens.css에 존재"
```

- [ ] **Step 2: 실행 검증**

Run: `bash scripts/check-tokens.sh`
Expected: 마지막 두 줄에
```
preset/tokens primary 일치 #FFC400
OK: STYLE-GUIDE 토큰 전부 tokens.css에 존재
```
실패 시: `MISSING in tokens.css: --xxx` 가 나온 토큰을 tokens.css에 추가하거나 STYLE-GUIDE.md의 오타를 고친 뒤 재실행.

- [ ] **Step 3: 커밋**

```bash
git add scripts/check-tokens.sh
git -c user.name="wooji" -c user.email="woojin.jeon415@gmail.com" commit -m "토큰 일치 검증 스크립트 추가

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: GitHub public 레포 생성 · 푸시 · 접근 검증

**Files:** (없음 — 원격 작업)

- [ ] **Step 1: gh 인증·org 접근 확인**

Run: `gh auth status && gh repo list das00n --limit 1`
Expected: 로그인됨 + das00n 레포 목록 1개 표시. 실패 시 `gh auth login` 안내 후 중단.

- [ ] **Step 2: public 레포 생성 + 푸시**

Run:
```bash
gh repo create das00n/eggdrop-design-system --public \
  --description "에그드랍 디자인 시스템 — 스타일 가이드(토큰+컴포넌트 규칙)" \
  --source=. --remote=origin --push
```
Expected: 레포 생성 메시지 + `master` 브랜치 푸시 완료. (이미 존재하면 STOP — 사용자에게 알리고 이름/방침 재확인.)

- [ ] **Step 3: raw URL 접근 검증**

Run: `curl -s -o /dev/null -w '%{http_code}\n' https://raw.githubusercontent.com/das00n/eggdrop-design-system/master/STYLE-GUIDE.md`
Expected: `200`

- [ ] **Step 4: 완료 보고**

레포 URL과 raw STYLE-GUIDE URL을 사용자에게 출력한다:
- 레포: `https://github.com/das00n/eggdrop-design-system`
- raw 가이드: `https://raw.githubusercontent.com/das00n/eggdrop-design-system/master/STYLE-GUIDE.md`

---

## Self-Review

**1. Spec coverage**
- 폴더/파일 구성(spec §4) → Task 1~5
- 토큰: 색·타이포·간격·모서리·테두리·그림자(spec §5) → Task 1 (tokens.css) + Task 2 (preset)
- 컴포넌트 6종(spec §6) → Task 3 STYLE-GUIDE.md
- 자동 적용/사용법(spec §7) → Task 4 README.md
- GitHub public 정본 + 다중 머신 접근(spec §3) → Task 6
- 성공기준 #4(토큰명 실재) → Task 5 검증 스크립트
- 확장(spec §8) → STYLE-GUIDE·README에 명시, 구현은 안 함(YAGNI) ✓
- 범위 밖(spec §9: 실제 컴포넌트 코드·design-sync·다크모드) → 포함 안 함 ✓

**2. Placeholder scan:** TBD/TODO/“적절히 처리” 없음. 모든 파일 내용·검증 명령·기대 출력 구체적으로 기재됨. ✓

**3. Type consistency:** 토큰명이 tokens.css·tailwind.preset.js·STYLE-GUIDE.md·check-tokens.sh 전반에서 일치(`--c-primary`/#FFC400, `primary.DEFAULT`). 브랜치명 `master`로 통일(spec·git init 결과와 동일). ✓
