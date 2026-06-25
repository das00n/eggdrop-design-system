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
npm 패키지가 아니므로(spec §9), 이 레포를 클론한 위치를 상대/절대 경로로 가리킨다.
```js
// tailwind.config.js — 경로는 이 레포 클론 위치에 맞춰 조정
module.exports = { presets: [require('../eggdrop-design-system/tailwind.preset.js')] };
```

## 수정·확장
값을 바꿀 땐 항상 `tokens.css`를 고치고 `tailwind.preset.js`를 같은 값으로 맞춘다. 새 스타일은 `themes/<이름>.css`로 추가한다. 변경 후 `git push`, 다른 머신은 `pull`, 채팅 Project는 재업로드.
