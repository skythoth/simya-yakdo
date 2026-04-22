// API 응답 데이터를 앱에서 사용하는 형태로 변환
// TODO: 실제 API 응답 구조에 맞게 매핑 로직 작성

/**
 * API 응답 1건을 앱용 약국 객체로 변환
 * TODO: 실제 필드 매핑
 */
export function mapPharmacyFromApi(raw) {
  return {
    id: raw.id || '',
    name: raw.name || '이름 없음',
    address: raw.address || '주소 정보 없음',
    phone: raw.phone || '',
    lat: raw.lat || 0,
    lng: raw.lng || 0,
    operatingHours: raw.operatingHours || null,
    statusLabel: '확인 필요',
    distance: null,
  };
}

/**
 * API 응답 목록을 앱용 배열로 변환
 */
export function mapPharmacyListFromApi(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapPharmacyFromApi);
}
