// 약국 관련 전역 상태 (Zustand)
import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedSido: "",
  setSelectedSido: (sido) => set({ selectedSido: sido }),

  selectedDistrict: "",
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),

  openFilter: "",
  setOpenFilter: (filter) => set({ openFilter: filter }),
}));

export default useFilterStore;
