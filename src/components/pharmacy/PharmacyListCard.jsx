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

  const isMidnight = isLateNightPharmacy(pharmacy.operatingHours);
  const isOpen = getPharmacyStatus(pharmacy.operatingHours, isHoliday);
  const HolidayOpen = pharmacy.operatingHours.holiday?.open ? true : false;

  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pharmacy);
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 mb-3 rounded-xl flex flex-col transition-all duration-200 cursor-pointer border
    ${
      isActive
        ? "bg-indigo-50/40 border-indigo-200/60 shadow-sm -translate-y-[1px]"
        : "bg-white border-gray-100 shadow-sm"
    }`}
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

      {/* 칩 영역 */}
      <div className="flex items-center gap-1.5 mb-3">
        <Chip label={isOpen ? "영업중" : "영업종료"} active={isOpen} />
        {isMidnight && (
          <Chip label="야간운영" variant="midnight" active={isOpen} />
        )}
        {HolidayOpen && (
          <Chip label="공휴일 운영" variant="holiday" active={isOpen} />
        )}
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col gap-1.5">
        {/* 주소 */}
        <div className="flex items-start gap-2 text-gray-500">
          <MapPin size={15} className="text-gray-400 shrink-0 mt-0.5" />
          <span className="text-[13px] leading-relaxed">
            {pharmacy.address}
          </span>
        </div>

        {/* 영업 시간 */}
        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={15} className="text-gray-400 shrink-0" />
          <span className="text-[13px]">
            {isOpen
              ? `${pharmacy.operatingHours[today]?.open || "정보 없음"} ~ ${pharmacy.operatingHours[today]?.close || "정보 없음"}`
              : "영업종료"}
          </span>
        </div>

        {/* 전화번호 */}
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gray-400 shrink-0" />
          {pharmacy.phone ? (
            <a
              href={`tel:${pharmacy.phone}`}
              className="text-[13px] text-gray-500 hover:text-indigo-600 hover:font-medium transition-colors cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {pharmacy.phone}
            </a>
          ) : (
            <span className="text-[13px] text-gray-400">번호 없음</span>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center pt-3 border-t border-gray-100 mt-3">
        <div className="flex items-center gap-0.5 text-gray-400">
          <span className="text-[11px]">상세보기</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default PharmacyListCard;
