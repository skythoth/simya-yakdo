// 거리 계산 유틸리티

/**
 * 두 좌표 간 직선 거리 계산 (Haversine 공식)
 * TODO: 실제 계산 로직 구현
 * @returns 거리 (미터 단위)
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  // TODO: Haversine 공식 구현
  console.log('calculateDistance - 미구현');
  return null;
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
