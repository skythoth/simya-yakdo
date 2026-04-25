// 약국 관련 전역 상태 (Zustand)
import { create } from "zustand";

const usePharmacyStore = create((set) => ({
  // 약국 목록
  pharmacies: [],
  // 현재 선택된 약국 (모달용)
  selectedPharmacy: null,
  // 즐겨찾기 목록
  favorites: [],
  // 현재 적용 중인 필터
  filter: "all",
  // 로딩 상태
  isLoading: false,

  // 약국 목록 세팅
  setPharmacies: (pharmacies) => set({ pharmacies }),

  // 약국 선택/해제
  selectPharmacy: (pharmacy) => set({ selectedPharmacy: pharmacy }),
  clearSelection: () => set({ selectedPharmacy: null }),

  // 즐겨찾기 토글
  toggleFavorite: (pharmacyId) => {
    // TODO: 즐겨찾기 추가/제거 로직
    console.log("즐겨찾기 토글:", pharmacyId);
  },

  // 필터 변경
  setFilter: (filter) => set({ filter }),

  // 로딩 상태 변경
  setLoading: (isLoading) => set({ isLoading }),
}));

export default usePharmacyStore;
