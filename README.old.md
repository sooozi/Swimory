# 🏊‍♀️ Swimory

**수영을 기록하고 추억하는 웹 플랫폼, Swimory**  
서울의 수영장을 지도에서 찾고, 나의 수영 기록을 남기고,  
자유형·배영·평영·접영 영상까지 찾아볼 수 있는 올인원 수영 웹 앱입니다.

---

## 🧠 프로젝트 기획 의도

**“수영을 자주 하지만 정리해본 적이 없다면?”**  
Swimory는 수영 기록을 남기고, 영상으로 학습하고,  
수영장 정보까지 확인할 수 있는 **수영인을 위한 가벼운 일기장**입니다.  
데이터 중심의 구조 설계를 연습하고, 외부 API 연동과 상태 관리를 경험해보기 위해 제작했습니다.

## 📸 데모 이미지

> (여기에 추후 서비스 스크린샷 첨부)

---

## 🔗 데모 링크

배포 후 기재 예정

<!-- [👉 Swimory 웹사이트 보러가기](https://your-project-url.vercel.app) -->

---

## ✨ 주요 기능

| 기능                   | 설명                                                           |
| ---------------------- | -------------------------------------------------------------- |
| 🗺️ 수영장 지도         | 서울시 공공체육시설 API를 활용해 수영장 위치 및 상세 정보 표시 |
| 📝 수영 기록           | 날짜, 시간, 영법, 거리, 느낌 등을 자유롭게 기록                |
| 📺 유튜브 영상 연동    | 자유형·배영·평영·접영별 학습 영상 노출 및 검색                 |
| 🔔 예약 알림 (예정)    | 수영장 예약 오픈 시점 알림 기능 구현 예정                      |
| 📍 내 주변 찾기 (예정) | 위치 기반 수영장 필터링 (Geolocation 활용 예정)                |

---

## 📦 사용된 기술 스택

| 영역            | 기술                |
| --------------- | ------------------- |
| **프레임워크**  | React (TypeScript)  |
| **스타일링**    | Tailwind CSS        |
| **상태관리**    | Zustand             |
| **API 연동**    | Axios + React Query |
| **데이터 저장** | MySQL               |
| **외부 API**    |

- [서울특별시 공공서비스예약 OpenAPI](https://data.seoul.go.kr/dataList/OA-15511/S/1/datasetView.do)
- [YouTube Data API v3](https://developers.google.com/youtube/v3) |

---

## 🗂️ 폴더 구조

```
src/
├── api/          # API 요청 모듈
├── assets/       # 정적 파일 (이미지, 아이콘 등)
├── components/   # 재사용 가능한 공통 컴포넌트
├── constants/    # 상수 정의 (카테고리, 메시지 등)
├── hooks/        # 커스텀 훅
├── layouts/      # 페이지 템플릿 또는 전체 레이아웃
├── pages/        # 라우트 페이지
├── routes/       # 라우터 설정 (React Router or Next.js)
├── store/        # Zustand 상태 저장소
├── styles/       # 전역 스타일 정의
├── types/        # 공통 타입 정의
└── utils/        # 유틸 함수
```

---

## 🧪 향후 업데이트 예정

- [ ] 수영 기록 통계 시각화
- [ ] 예약 마감 / 오픈 알림 기능
- [ ] 회원가입, 로그인
- [ ] Apple Watch와 연동 고려 (웹 기반 한계 내에서)

---

## 💬 GitHub Topics

`react` `typescript` `tailwind` `zustand` `supabase` `swimming` `youtube` `map` `openapi` `webapp`

---

## 🧑‍💻 개발자

- 이름: 김수지 (Sooozi)
- GitHub: [@yourgithubid](https://github.com/sooozi)

---

## 📄 License

MIT License
