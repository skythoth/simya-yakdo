// API 응답 데이터를 앱에서 사용하는 형태로 변환
function formatHour(value) {
  if (!value) return null;

  const normalizedValue = String(value).trim().padStart(4, "0");
  return `${normalizedValue.slice(0, 2)}:${normalizedValue.slice(2, 4)}`;
}

function createOperatingHours(raw) {
  return {
    sunday: {
      open: formatHour(raw.MDEXM_BGNG_HR_SNDY),
      close: formatHour(raw.MDEXM_END_HR_SNDY),
    },
    monday: {
      open: formatHour(raw.MDEXM_BGNG_HR_MNDY),
      close: formatHour(raw.MDEXM_END_HR_MNDY),
    },
    tuesday: {
      open: formatHour(raw.MDEXM_BGNG_HR_TSDY),
      close: formatHour(raw.MDEXM_END_HR_TSDY),
    },
    wednesday: {
      open: formatHour(raw.MDEXM_BGNG_HR_WDDY),
      close: formatHour(raw.MDEXM_END_HR_WDDY),
    },
    thursday: {
      open: formatHour(raw.MDEXM_BGNG_HR_THDY),
      close: formatHour(raw.MDEXM_END_HR_THDY),
    },
    friday: {
      open: formatHour(raw.MDEXM_BGNG_HR_FRDY),
      close: formatHour(raw.MDEXM_END_HR_FRDY),
    },
    saturday: {
      open: formatHour(raw.MDEXM_BGNG_HR_STDY),
      close: formatHour(raw.MDEXM_END_HR_STDY),
    },
    holiday: {
      open: formatHour(raw.MDEXM_BGNG_HR_LHLDY),
      close: formatHour(raw.MDEXM_END_HR_LHLDY),
    },
  };
}

/**
 * API 응답 1건을 앱용 약국 객체로 변환
 */
export function mapPharmacyFromApi(raw) {
  const operatingHours = createOperatingHours(raw);

  return {
    id: raw.INST_ID, // 기관 아이디
    name: raw.INST_NM, // 기관명
    address: raw.ADDR || "주소 정보 없음", // 주소
    phone: raw.RPRS_TELNO || "", // 대표 전화번호
    lat: raw.LAT, // 위도
    lng: raw.LOT, // 경도
    XMAP_CRTS: raw.XMAP_CRTS, // X 좌표
    YMAP_CRTS: raw.YMAP_CRTS, // Y 좌표
    operatingHours,
    distance: null,
    ESNS: raw.ESNS || "", // 간이
    RMRK: raw.RMRK || "", // 비고
    description: raw.INST_EXPLN_DTL || "", // 기관설명상세
    weekendOpen: raw.WKND_MDEXM_YN === "Y", // 주말 영업 여부
    zipCode: `${raw.ZIP_1 || ""}${raw.ZIP_2 || ""}`.trim(), // 우편번호
  };
}

/**
 * API 응답 목록을 앱용 배열로 변환
 */
export function mapPharmacyListFromApi(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapPharmacyFromApi);
}
