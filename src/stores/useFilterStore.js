// 약국 관련 전역 상태 (Zustand)
import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedSido: "",
  setSelectedSido: (sido) => set({ selectedSido: sido }),

  selectedDistrict: "",
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),

  openFilter: "", // 영업중 필터
  setOpenFilter: (filter) => set({ openFilter: filter }),

  lateNightFilter: false, // 야간운영 필터
  setLateNightFilter: (filter) => set({ lateNightFilter: filter }),

  holidayFilter: false, // 공휴일운영 필터
  setHolidayFilter: (filter) => set({ holidayFilter: filter }),
}));

export default useFilterStore;
