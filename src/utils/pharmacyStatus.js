// 약국 운영 상태 판별 유틸리티
// TODO: 실제 영업시간 데이터 기반 계산 로직 구현

/**
 * 현재 시간 기준 약국 운영 상태 반환
 * TODO: operatingHours 파싱 및 판별 로직
 * @returns 'open' | 'closed' | 'unknown'
 */
export function getPharmacyStatus(operatingHours) {
  if (!operatingHours) return 'unknown';
  // TODO: 영업시간 파싱 → 현재 시간과 비교
  console.log('getPharmacyStatus - 미구현');
  return 'unknown';
}

/**
 * 영업시간 문자열 포맷
 * TODO: 요일별 영업시간 표시용 포맷
 */
export function formatOperatingHours(operatingHours) {
  if (!operatingHours) return '영업시간 정보 없음';
  // TODO: 보기 좋은 형태로 변환
  return '영업시간 정보 확인 필요';
}

/**
 * 심야 운영 여부 판별
 * TODO: 심야 기준 시간 정의 및 판별
 */
export function isLateNightPharmacy(operatingHours) {
  // TODO: 심야(예: 22시 이후) 운영 여부 판별
  console.log('isLateNightPharmacy - 미구현');
  return false;
}
