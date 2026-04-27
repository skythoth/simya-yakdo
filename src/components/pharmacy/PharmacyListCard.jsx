import React from "react";
import { Heart, MapPin, Phone, ChevronDown, Clock } from "lucide-react";
import Chip from "../common/Chip";
import usePharmacyStore from "../../stores/usePharmacyStore";
import {
  getPharmacyStatus,
  isLateNightPharmacy,
} from "../../utils/pharmacyStatus";
import { formatDistance } from "../../utils/distance";

function PharmacyListCard({ pharmacy, onClick, isActive, isHoliday }) {
  const { favorites, toggleFavorite } = usePharmacyStore();
  const isFavorite = favorites.some((fav) => fav.id === pharmacy.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pharmacy);
  };

  const isMidnight = isLateNightPharmacy(pharmacy.operatingHours);
  const isOpen = getPharmacyStatus(pharmacy.operatingHours, isHoliday);
  const HolidayOpen = pharmacy.operatingHours.holiday?.open ? true : false;
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  return (
    <div
      onClick={onClick}
      className={`p-4 mb-3 bg-white border rounded-xl flex flex-col transition-colors cursor-pointer
        ${isActive ? "border-indigo-500 bg-indigo-50" : "border-gray-100"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <strong className="text-[18px] text-gray-900 font-bold truncate">
            {pharmacy.name}
          </strong>
          <span className="text-[14px] font-semibold text-sky-600 shrink-0">
            {pharmacy.distance ? formatDistance(pharmacy.distance) : ""}
          </span>
        </div>

        {/* 즐겨찾기 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="p-1 -mt-1 -mr-1 transition-colors"
        >
          <Heart
            size={22}
            className={
              isFavorite ? "fill-red-700 text-red-700" : "text-gray-300"
            }
          />
        </button>
      </div>

      {/* 칩 */}
      <div className="flex items-center gap-1.5 mb-3">
        <Chip label={isOpen ? "영업중" : "영업종료"} active={isOpen} />
        {isMidnight && <Chip label="야간운영" variant="midnight" />}
        {HolidayOpen && <Chip label="공휴일 운영" variant="holiday" />}
      </div>

      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={15} className="text-gray-400 shrink-0" />
          <span className="text-[13px]">
            {isOpen
              ? `${pharmacy.operatingHours[today]?.open || "영업시간 정보 없음"} ~ ${pharmacy.operatingHours[today]?.close || "영업시간 정보 없음"}`
              : "영업종료"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={15} className="text-gray-400 shrink-0" />
          <span className="text-[13px] leading-relaxed break-keep">
            {pharmacy.address}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          <Phone size={14} className="text-gray-400" />
          <span className="text-[12px]">{pharmacy.phone || "번호 없음"}</span>
        </div>
        <div className="flex items-center gap-0.5 text-gray-400">
          <span className="text-[11px]">상세보기</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

export default PharmacyListCard;
