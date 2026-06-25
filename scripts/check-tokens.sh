#!/usr/bin/env bash
# STYLE-GUIDE.md의 모든 --c-*/--text-*/--radius-*/--space-* 토큰이 tokens.css에 정의돼 있는지 검증
set -euo pipefail
cd "$(dirname "$0")/.."

missing=0
# STYLE-GUIDE.md에서 var(--xxx) 로 참조된 토큰 추출
for tok in $(grep -oE 'var\(--[a-z0-9-]+\)' STYLE-GUIDE.md | sed -E 's/var\((--[a-z0-9-]+)\)/\1/' | sort -u); do
  if ! grep -qF -- "$tok:" tokens.css; then
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
