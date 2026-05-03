# 심야약도 (Simya Yakdo)

> 밤에도 약이 필요할 때, 가장 가까운 심야약국을 찾아드립니다

코알누 리액트 스터디 5기 - 그룹 프로젝트 1조 | 2026.04.20 ~ 2026.05.03

**배포 URL:** https://simya-yakdo.netlify.app

---

## 프로젝트 소개

심야약도는 사용자의 현재 위치를 기반으로 주변 약국을 지도에 표시하고, 영업 상태/야간 운영/공휴일 운영 여부를 한눈에 확인할 수 있는 웹 서비스입니다.

### 주요 기능

- **현위치 기반 약국 탐색** - GPS를 활용한 주변 약국 자동 탐색 (반경 2km)
- **카카오맵 연동** - 지도 위 마커 표시, 마커 클러스터링
- **실시간 영업 상태** - 영업중/영업종료, 야간운영, 공휴일 운영 칩 표시
- **필터링** - 시/도·시군구 지역 필터, 영업중/야간/공휴일 필터
- **현재 지도 영역 검색** - 지도 이동 후 해당 영역 내 약국 재검색
- **약국 상세정보** - 운영시간, 주소, 전화번호, 전화 바로걸기
- **즐겨찾기** - 자주 가는 약국 저장/관리
- **반응형 레이아웃** - 모바일/데스크탑 대응

---

## 기술 스택

| 분류      | 기술                                  |
| --------- | ------------------------------------- |
| Framework | React 18 + Vite 5                     |
| 상태관리  | Zustand, TanStack React Query         |
| 라우팅    | React Router v6                       |
| 지도      | Kakao Maps SDK (react-kakao-maps-sdk) |
| HTTP      | Axios                                 |
| 스타일링  | Tailwind CSS v4                       |
| 아이콘    | Lucide React                          |
| 배포      | Netlify (Serverless Functions)        |

---

## 프로젝트 구조

```
src/
├── pages/                    # 페이지 컴포넌트
│   ├── HomePage.jsx          # 메인 (지도 + 약국 리스트)
│   ├── FavoritesPage.jsx     # 즐겨찾기
│   └── NotFoundPage.jsx      # 404
│
├── components/
│   ├── common/               # 공통 UI (Button, Chip, Loading 등)
│   ├── layout/               # 레이아웃 (Header, MapFilterButtons)
│   ├── map/                  # 지도 (Map, MapView)
│   └── pharmacy/             # 약국 (List, Card, Detail, Filter, Toggle)
│
├── hooks/                    # 커스텀 훅
│   ├── useCurrentLocation.js # 현재 위치 + 역지오코딩
│   ├── useGetPharmacy.js     # 약국 데이터 조회 (React Query)
│   ├── useGetHoliday.js      # 공휴일 조회
│   ├── useGetAddress.js      # 주소 변환
│   ├── useKakaoLoader.js     # 카카오맵 SDK 로드
│   └── useMapMarkers.js      # 맵 마커 관리
│
├── services/                 # API 레이어
│   └── pharmacy/
│       ├── pharmacyApi.js    # API 호출
│       └── pharmacyMapper.js # 응답 → 앱 모델 변환
│
├── stores/                   # Zustand 스토어
│   ├── usePharmacyStore.js   # 즐겨찾기 상태
│   └── useFilterStore.js     # 필터 상태 (지역, 영업중 등)
│
├── utils/                    # 유틸리티
│   ├── distance.js           # Haversine 거리 계산
│   └── pharmacyStatus.js     # 영업 상태 판별
│
├── constants/                # 상수
│   ├── filterOptions.js
│   └── statusLabels.js
│
└── mocks/                    # 목업 데이터
    └── pharmacies.js

netlify/functions/            # Netlify Serverless Functions (API 프록시)
├── pharmacy.js
└── holiday.js
```

---

## 시작하기

### 사전 요구사항

- Node.js 18+
- [카카오 개발자](https://developers.kakao.com/) JavaScript 앱 키
- [공공데이터포털](https://www.data.go.kr/) 서비스 키
  - 건강보험심사평가원 약국 목록 API
  - 공휴일 정보 API

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-repo/simya-yakdo.git
cd simya-yakdo

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 API 키 입력

# 개발 서버 실행
npm run dev
```

### 환경변수

프로젝트 루트에 `.env` 파일을 생성하고 아래 값을 설정합니다.

```env
VITE_SERVICE_KEY=공공데이터포털_서비스키
VITE_KAKAO_MAP_KEY=카카오_JavaScript_앱키
```

> Netlify 배포 시에는 Netlify 대시보드 → Site configuration → Environment variables에 동일한 키를 등록해야 합니다.

---

## 사용한 API

| API                                                                            | 제공처             | 용도                      |
| ------------------------------------------------------------------------------ | ------------------ | ------------------------- |
| [ErmctInsttInfoInqireService](https://www.data.go.kr/data/15000563/openapi.do) | 건강보험심사평가원 | 전국 약국 목록 + 운영시간 |
| [SpcdeInfoService](https://www.data.go.kr/data/15012690/openapi.do)            | 천문연구원         | 공휴일 정보               |
| [Kakao Maps JavaScript API](https://apis.kakao.com/web/maps/)                  | 카카오             | 지도, 마커, 역지오코딩    |

---

## 팀원

| 이름   | 역할                                              |
| ------ | ------------------------------------------------- |
| 장수창 | Product Owner, 맵 관련 기능                       |
| 김기범 | Scrum Master, 약국 정보 API 연동, 즐찾, 필터 관련 |
| 송신애 | UI/UX 디자인, 컴포넌트 구현                       |
