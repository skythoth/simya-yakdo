// 약국 운영 상태 판별 유틸리티
// TODO: 실제 영업시간 데이터 기반 계산 로직 구현

/**
 * 현재 시간 기준 약국 운영 상태 반환
 */
export function getPharmacyStatus(operatingHours, isHoliday = false) {
  if (!operatingHours) return false;

  const dayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const toMinutes = (value) => {
    if (!value || typeof value !== "string") return null;

    const [hour, minute] = value.split(":").map(Number);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return null;
    }

    return hour * 60 + minute;
  };

  const now = new Date();
  const todayKey = dayKeys[now.getDay()];
  const todayHours = isHoliday
    ? operatingHours.holiday || operatingHours[todayKey]
    : operatingHours[todayKey];
  const openMinutes = toMinutes(todayHours?.open);
  const closeMinutes = toMinutes(todayHours?.close);

  if (openMinutes === null || closeMinutes === null) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (closeMinutes <= openMinutes) {
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

/**
 * 영업시간 문자열 포맷
 * 요일별 영업시간 표시용 포맷
 */
export function formatOperatingHours(operatingHours) {
  if (!operatingHours) return [];

  const dayEntries = [
    ["월요일", operatingHours.monday],
    ["화요일", operatingHours.tuesday],
    ["수요일", operatingHours.wednesday],
    ["목요일", operatingHours.thursday],
    ["금요일", operatingHours.friday],
    ["토요일", operatingHours.saturday],
    ["일요일", operatingHours.sunday],
    ["공휴일", operatingHours.holiday],
  ];

  return dayEntries.map(([day, hours]) => ({
    day,
    time:
      hours?.open && hours?.close ? `${hours.open} - ${hours.close}` : "휴무",
  }));
}

/**
 * 야간운영 여부 판별
 */
export function isLateNightPharmacy(operatingHours) {
  if (!operatingHours) return false;

  const toMinutes = (value) => {
    if (!value || typeof value !== "string") return null;

    const [hour, minute] = value.split(":").map(Number);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return null;
    }

    return hour * 60 + minute;
  };

  return Object.values(operatingHours).some((hours) => {
    const openMinutes = toMinutes(hours?.open);
    const closeMinutes = toMinutes(hours?.close);

    if (openMinutes === null || closeMinutes === null) {
      return false;
    }

    // 자정을 넘겨 운영하는 경우도 심야 영업으로 본다.
    if (closeMinutes <= openMinutes) {
      return true;
    }

    return closeMinutes >= 22 * 60;
  });
}
