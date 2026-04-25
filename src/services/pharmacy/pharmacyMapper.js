// API 응답 데이터를 앱에서 사용하는 형태로 변환
function formatHour(value) {
  if (!value) return null;
  const normalizedValue = String(value).trim().padStart(4, "0");
  return `${normalizedValue.slice(0, 2)}:${normalizedValue.slice(2, 4)}`;
}

function createOperatingHours(raw) {
  return {
    monday:    { open: formatHour(raw.dutyTime1s), close: formatHour(raw.dutyTime1c) },
    tuesday:   { open: formatHour(raw.dutyTime2s), close: formatHour(raw.dutyTime2c) },
    wednesday: { open: formatHour(raw.dutyTime3s), close: formatHour(raw.dutyTime3c) },
    thursday:  { open: formatHour(raw.dutyTime4s), close: formatHour(raw.dutyTime4c) },
    friday:    { open: formatHour(raw.dutyTime5s), close: formatHour(raw.dutyTime5c) },
    saturday:  { open: formatHour(raw.dutyTime6s), close: formatHour(raw.dutyTime6c) },
    sunday:    { open: formatHour(raw.dutyTime7s), close: formatHour(raw.dutyTime7c) },
    holiday:   { open: formatHour(raw.dutyTime8s), close: formatHour(raw.dutyTime8c) },
  };
}

/**
 * API 응답 1건을 앱용 약국 객체로 변환
 */
export function mapPharmacyFromApi(raw) {
  return {
    id: raw.hpid,
    name: (raw.dutyName || "").trim(),
    address: raw.dutyAddr || "주소 정보 없음",
    phone: raw.dutyTel1 || "",
    lat: raw.wgs84Lat,
    lng: raw.wgs84Lon,
    operatingHours: createOperatingHours(raw),
    distance: null,
    description: raw.dutyInf || "",
    etc: raw.dutyEtc || "",
  };
}

/**
 * API 응답 목록을 앱용 배열로 변환
 */
export function mapPharmacyListFromApi(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapPharmacyFromApi);
}
