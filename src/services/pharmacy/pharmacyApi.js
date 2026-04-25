// 약국 API 호출 레이어
// TODO: 실제 공공데이터 API 연동
import axios from "axios";

/**
 * 위치 기반 약국 목록 조회
 * TODO: 실제 API 연동 시 구현
 */
//const API_BASE_URL = "/api/safetydata/DSSP-IF-00155";     // TODO: 공공데이터포털 API URL
/*
export async function fetchNearbyPharmacies() {
  const response = await axios.get(API_BASE_URL, {
    params: {
      pageNo: 1,
      numOfRows: 1500,
      returnType: "JSON",
    },
  });

  console.log("API 응답:", response.data);
  return response.data;
}
*/
/**
 * 위치 기반 약국 목록 조회
 * 심평원 api로 변경
 */
const API_BASE_URL = "/api/pharmacy";

export async function fetchNearbyPharmacies(pageNo = 1, numOfRows = 5000) {
  const response = await axios.get(API_BASE_URL, {
    params: {
      pageNo,
      numOfRows,
      _type: "json",
    },
  });

  return response.data;
}
/**
 * 약국 상세 정보 조회
 * TODO: 실제 API 연동 시 구현
 */
export async function fetchPharmacyDetail(pharmacyId) {
  console.log("fetchPharmacyDetail 호출:", pharmacyId);
  // TODO: axios.get(...)
  return null;
}
