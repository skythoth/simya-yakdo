// 개발용 더미 약국 데이터

export const mockPharmacies = [
  {
    id: '1',
    name: '온누리약국',
    address: '서울특별시 중구 세종대로 110',
    phone: '02-1234-5678',
    lat: 37.5666,
    lng: 126.9784,
    operatingHours: null, // TODO: 영업시간 데이터 구조 확정 후 추가
    statusLabel: '영업중',
    distance: 150,
  },
  {
    id: '2',
    name: '건강약국',
    address: '서울특별시 중구 을지로 12',
    phone: '02-2345-6789',
    lat: 37.566,
    lng: 126.982,
    operatingHours: null,
    statusLabel: '확인 필요',
    distance: 320,
  },
  {
    id: '3',
    name: '심야약국 24시',
    address: '서울특별시 종로구 종로 1',
    phone: '02-3456-7890',
    lat: 37.57,
    lng: 126.977,
    operatingHours: null,
    statusLabel: '영업중',
    distance: 580,
  },
  {
    id: '4',
    name: '해피약국',
    address: '서울특별시 중구 남대문로 23',
    phone: '',
    lat: 37.563,
    lng: 126.975,
    operatingHours: null,
    statusLabel: '정보 부족',
    distance: null,
  },
];
