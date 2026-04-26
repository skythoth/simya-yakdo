import React from "react";
import PharmacyFavoriteCard from "../components/pharmacy/PharmacyFavoriteCard";
import usePharmacyStore from "../stores/usePharmacyStore";
import EmptyState from "../components/common/EmptyState";

const FavoritesPage = ({ onSelect }) => {
  const { favorites } = usePharmacyStore();
  const handleCardClick = (pharmacy) => {
    if (onSelect) onSelect(pharmacy);
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="w-full md:max-w-[800px] mx-auto px-4 pt-8">
        <header className="mb-6">
          <h1 className="text-[22px] font-bold text-slate-900">즐겨찾기</h1>
          <p className="text-[13px] text-slate-500 mt-1">
            내가 저장한 약국 목록입니다.
          </p>
        </header>

        <div className="flex flex-col">
          {/*약국리스트*/}
          {!favorites || favorites.length === 0 ? (
            <EmptyState message="아직 즐겨찾기한 약국이 없습니다." />
          ) : (
            favorites.map((pharmacy) => (
              <PharmacyFavoriteCard
                key={pharmacy.id}
                pharmacy={pharmacy}
                onClick={() => handleCardClick(pharmacy)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
