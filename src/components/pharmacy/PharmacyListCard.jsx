import React from "react";
import { Heart, MapPin, Phone, ChevronDown, Clock } from "lucide-react";
import Chip from "../common/Chip";
import usePharmacyStore from "../../stores/usePharmacyStore";

function PharmacyListCard({ pharmacy, onClick }) {
  const { favorites, toggleFavorite } = usePharmacyStore();
  const isFavorite = favorites.some((fav) => fav.id === pharmacy.id);
  const isOpening = pharmacy.statusLabel === "영업중";

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pharmacy);
  };

  return (
    <div
      onClick={onClick}
      className="p-4 mb-3 bg-white border border-gray-100 rounded-xl flex flex-col"
    >
      {/* 이름 & 거리 & 하트 */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <strong className="text-[18px] text-gray-900 font-bold truncate">
            {pharmacy.name}
          </strong>
          <span className="text-[14px] font-semibold text-sky-600 shrink-0">
            {pharmacy.distance ? `${pharmacy.distance}m` : ""}
          </span>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="p-1 -mt-1 -mr-1 transition-colors"
        >
          <Heart
            size={23}
            className={
              isFavorite ? "fill-red-700 text-red-700" : "text-gray-300"
            }
          />
        </button>
      </div>

      {/* 상태 칩*/}
      <div className="flex items-center gap-1.5 mb-3">
        {pharmacy.isMidnight && <Chip label="심야" variant="midnight" />}
        <Chip label={isOpening ? "영업중" : "영업종료"} active={isOpening} />
      </div>

      {/* 세부내용 */}
      <div className="flex flex-col gap-1.5 mb-3">
        {/* 시간 */}
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={15} className="text-gray-400 shrink-0" />
          <span className="text-[13px]">
            {isOpening ? pharmacy.openingTime || "09:00~18:00" : "영업 종료"}
          </span>
        </div>

        {/* 주소 */}
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={15} className="text-gray-400 shrink-0" />
          <span className="text-[13px] truncate">{pharmacy.address}</span>
        </div>
      </div>

      {/* 전화번호 */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          <Phone size={14} className="text-gray-400" />
          <span className="text-[12px]">{pharmacy.phone || "번호 없음"}</span>
        </div>

        {/* 상세보기 */}
        <div className="flex items-center gap-0.5 text-gray-400">
          <span className="text-[11px]">상세보기</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

export default PharmacyListCard;
