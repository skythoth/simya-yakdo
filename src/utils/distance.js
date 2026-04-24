// 거리 계산 유틸리티

/**
 * 두 좌표 간 직선 거리 계산 (Haversine 공식)
 * TODO: 실제 계산 로직 구현
 * @returns 거리 (미터 단위)
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3; // 지구 반지름 (미터)
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // 미터 단위
}

/**
 * 거리를 보기 좋은 문자열로 변환
 * 예: 500 → "500m", 1200 → "1.2km"
 */
export function formatDistance(meters) {
  if (meters === null || meters === undefined) return '거리 정보 없음';
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
