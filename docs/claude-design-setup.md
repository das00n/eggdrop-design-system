# claude.ai/design "Set up your design system" 입력 시트

claude.ai/design 의 **Design system → Set up your design system** 화면에 붙여넣을 값. 전부 `tokens.css` 정본 기준. (화면 필드명에 맞춰 해당 값을 넣으면 됨.)

## 이름
```
Eggdrop (대시보드)
```

## 설명 / 가이드라인 (free-form 필드가 있으면)
```
데이터 대시보드 톤. 평면 + 1px 테두리, 그림자 최소, 정보 밀도 높게.
블랙·화이트 기반 + 옐로우(주요 액션, 화면당 1개) + 레드(강조·위험). 상태는 기능색.
폰트 Pretendard, 숫자는 tabular-nums(자릿수 정렬).
```

## 색상 (Colors)

중립 (Neutral)
| 이름 | hex | 역할 |
|---|---|---|
| ink | `#111111` | 기본 텍스트 / 다크 표면(사이드바) |
| gray-700 | `#3F3F46` | 보조 텍스트 |
| gray-500 | `#71717A` | 라벨·힌트 |
| gray-300 | `#D4D4D8` | 테두리 |
| gray-100 | `#F4F4F5` | 옅은 표면(표 헤더·지표 카드) |
| white | `#FFFFFF` | 기본 표면 |

브랜드 포인트 (Brand)
| 이름 | hex | 위 글자색 | 역할 |
|---|---|---|---|
| primary | `#FFC400` | `#3F2D00` | 주요 액션·하이라이트 |
| accent | `#E5322D` | `#FCEBEB` | 강조 |

기능 (Functional / Status) — 배경/글자 쌍
| 이름 | main | bg(연한) | text(진한) |
|---|---|---|---|
| success | `#16A34A` | `#DCFCE7` | `#14532D` |
| warning | `#F59E0B` | `#FEF3C7` | `#633806` |
| danger | `#E5322D` | `#FEE2E2` | `#7F1D1D` |
| info | `#2563EB` | `#DBEAFE` | `#1E3A8A` |

## 타이포그래피 (Typography)

폰트 패밀리:
```
Pretendard, -apple-system, "Segoe UI", "Malgun Gothic", sans-serif
```

스케일 (크기 / 가중치):
| 이름 | 크기 | 가중치 | 용도 |
|---|---|---|---|
| metric | 24px | 700 | 지표 숫자 (tabular-nums) |
| h1 | 22px | 600 | 페이지 제목 |
| h2 | 18px | 600 | 섹션 제목 |
| h3 | 16px | 600 | 카드 제목 |
| body | 14px | 400 | 본문(기본) |
| sm | 13px | 400 | 표·보조 |
| caption | 12px | 400 | 라벨·힌트 |

## 간격·모서리·그림자
- 간격(px): 4 · 8 · 12 · 16 · 24 · 32 · 48
- 모서리(px): sm 4 · md 8 · lg 12 · full 999
- 테두리: `1px solid #D4D4D8`
- 그림자: sm `0 1px 3px rgba(17,17,17,.10)` (드롭다운) · md `0 8px 24px rgba(17,17,17,.16)` (모달)

## 컴포넌트 (Components) — 입력 필드가 있으면 요약 사용
1. 버튼: primary(옐로우, 화면당 1개)·secondary(화이트+테두리)·danger(레드)·ghost(투명). 높이 36px, radius-md, weight 500.
2. 입력: 라벨(caption/gray-500) 위, 필드 36px·gray-300 테두리·radius-md, 포커스 링 ink.
3. 카드: 화이트+gray-300 테두리+radius-lg+패딩 16px. 지표 카드 변형: gray-100 배경·테두리 없음·radius-md·숫자 metric.
4. 표: 헤더 gray-100, 행 구분선 1px gray-300, 숫자 우측정렬 tabular-nums, 바깥 radius-lg.
5. 상태 배지: pill(radius-full), 연한 배경+같은 계열 진한 글자. 정상=success·대기=warning·미마감=danger·마감=ink배경+옐로우글자.
6. 레이아웃: 좌측 ink 사이드바(옐로우 로고·활성 항목) + 화이트 본문 + 상단 지표 카드 행.

> 컴포넌트별 HTML/Tailwind 예제는 `STYLE-GUIDE.md` 참고.
