import React from "react";
import { Heart, MapPin, Phone, ChevronDown, Clock } from "lucide-react";
import Chip from "../common/Chip";
import {
  getPharmacyStatus,
  isLateNightPharmacy,
} from "../../utils/pharmacyStatus";

function PharmacyListCard({ pharmacy, onClick, isActive, isHoliday }) {
  const isMidnight = isLateNightPharmacy(pharmacy.operatingHours);
  const isOpen = getPharmacyStatus(pharmacy.operatingHours, isHoliday);
  const HolidayOpen = pharmacy.operatingHours.holiday?.open ? true : false;
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  return (
    <div
      onClick={onClick}
      className={`p-4 mb-3 bg-white border rounded-xl flex flex-col transition-colors
        ${isActive ? "border-indigo-500 bg-indigo-50" : "border-gray-100"}`}
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
          onClick={(e) => e.stopPropagation()}
          className="p-1 -mt-1 -mr-1"
        >
          <Heart size={20} className="text-gray-300" />
        </button>
      </div>

      {/* 상태 칩*/}
      <div className="flex items-center gap-1.5 mb-3">
        <Chip label={isOpen ? "영업중" : "영업종료"} active={isOpen} />
        {isMidnight && <Chip label="야간운영" variant="midnight" />}
        {HolidayOpen && <Chip label="공휴일 운영" variant="holiday" />}
      </div>

      {/* 세부내용 */}
      <div className="flex flex-col gap-1.5 mb-3">
        {/* 시간 */}
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={15} className="text-gray-400 shrink-0" />
          <span className="text-[13px]">
            {isOpen
              ? `${pharmacy.operatingHours[today]?.open || "영업시간 정보 없음"} ~ ${pharmacy.operatingHours[today]?.close || "영업시간 정보 없음"}`
              : "영업종료"}
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
