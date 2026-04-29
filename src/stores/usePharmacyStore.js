// 약국 관련 전역 상태 (Zustand)
import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePharmacyStore = create(
  persist(
    (set) => ({
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
      toggleFavorite: (pharmacy) => {
        set((state) => {
          const isFavorite = state.favorites.some(
            (fav) => fav.id === pharmacy.id,
          );
          const newFavorites = isFavorite
            ? state.favorites.filter((fav) => fav.id !== pharmacy.id)
            : [...state.favorites, { ...pharmacy, memo: pharmacy.memo ?? "" }];

          return { favorites: newFavorites };
        });
      },

      updateFavoriteMemo: (pharmacyId, memo) => {
        set((state) => ({
          favorites: state.favorites.map((favorite) =>
            favorite.id === pharmacyId ? { ...favorite, memo } : favorite,
          ),
        }));
      },

      // 필터 변경
      setFilter: (filter) => set({ filter }),

      // 로딩 상태 변경
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "pharmacy-favorites",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);

export default usePharmacyStore;
