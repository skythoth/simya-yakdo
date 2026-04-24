import React from "react";
import { Heart, MapPin, Phone, ChevronDown } from "lucide-react";
import Chip from "../common/Chip";

function PharmacyListCard({ pharmacy, onClick }) {
  const isOpening = pharmacy.statusLabel === "영업중";

  //TODO 6시 이후 영업시 야간영업 버튼 추가

  return (
    <div
      onClick={onClick}
      className="p-3 mb-2 bg-white border border-gray-100 rounded-lg hover:shadow-sm active:bg-gray-100/50 transition-all cursor-pointer flex flex-col gap-1.5"
    >
      {/* 1. 약국이름 & 하트버튼  */}
      <div className="flex justify-between items-center">
        <strong className="text-[16px] text-gray-800 font-bold">
          {pharmacy.name}
        </strong>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1 hover:bg-gray-50 rounded-full"
        >
          <Heart size={18} className="text-gray-300" />
        </button>
      </div>

      {/* 2. 심야영업 & 영업상태  */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {pharmacy.isMidnight && <Chip label="심야영업" />}
        <Chip label={isOpening ? "영업중" : "미영업"} active={isOpening} />
        <span className="text-[12px] text-gray-500 ml-1">
          {isOpening ? pharmacy.openingTime || "09:00~18:00" : "확인 필요"}
        </span>
      </div>

      {/* 3. 거리 & 주소 */}
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-[13px] font-semibold text-indigo-800 whitespace-nowrap">
          {pharmacy.distance ? `${pharmacy.distance}m` : ""}
        </span>
        <div className="flex items-center gap-1 min-w-0">
          <MapPin size={13} className="text-gray-400 flex-shrink-0" />
          <span className="text-[12px] text-gray-500 truncate min-w-0">
            {pharmacy.address}
          </span>
        </div>
      </div>

      {/* 4. 전화번호 & 상세보기 */}
      <div className="flex justify-between items-center pt-1 border-t border-gray-50 mt-1">
        <div className="flex items-center gap-1">
          <Phone size={13} className="text-gray-400" />
          <span className="text-[12px] text-gray-500">
            {pharmacy.phone || "번호 없음"}
          </span>
        </div>

        <div className="flex items-center gap-0.5 text-gray-400">
          <span className="text-[11px]">상세</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

export default PharmacyListCard;
