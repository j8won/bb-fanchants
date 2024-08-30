run the development server:

```bash
pnpm dev
```

## MDX rule

1. metadata로 title, date, artist, imageUrl, musicUrl 필수 입력

```bash
---
title: 'Shoong!'
date: 2023-04-25
artist: '태양'
imageUrl: '/songs/taeyang/downToEarth.png'
musicUrl: 'https://www.youtube.com/watch?v=NFnAuiklEug'
---
```

2. 멜로디에 맞추어 따라하는 부분(노란색): `*`로 감싸기 (em)
3. 큰 목소리로 외치는 부분(파란색): `**`로 감싸기 (bold)
4. en 디렉토리와 ko 디렉토리 각각에 언어별로 mdx 파일 생성하기
