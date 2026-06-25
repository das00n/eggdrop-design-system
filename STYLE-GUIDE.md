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
