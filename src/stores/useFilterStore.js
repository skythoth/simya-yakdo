// 약국 관련 전역 상태 (Zustand)
import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedSido: "",
  setSelectedSido: (sido) => set({ selectedSido: sido }),

  selectedDistrict: "",
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),

  openFilter: "전체",
  setOpenFilter: (filter) => set({ openFilter: filter }),
}));

export default useFilterStore;
