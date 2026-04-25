import React from "react";
import { Heart, MapPin, Phone, Clock, Pencil, ChevronDown } from "lucide-react";
import Chip from "../common/Chip";

function PharmacyFavoriteCard({ pharmacy, onClick }) {
  const isOpening = pharmacy.statusLabel === "영업중";

  return (
    <div className="p-4 mb-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-3">
      {/* 1. 약국이름, 하트 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 min-w-0">
          <strong className="text-[18px] text-gray-900 font-bold truncate">
            {pharmacy.name}
          </strong>
        </div>
        {/* //TODO 버튼 활성화 */}
        <button className="p-1 -mt-1 -mr-1">
          <Heart size={22} className="text-red-600 fill-red-600" />
        </button>
      </div>

      {/* 2. 세부내용 및 지도 */}
      <div className="flex gap-3 items-stretch">
        {/* 2-1. 세부내용 (왼쪽) */}
        <div className="flex-1 flex flex-col gap-2">
          {/* 칩 */}
          <div className="flex items-center gap-1.5">
            {pharmacy.isMidnight && (
              <Chip label="야간운영" variant="midnight" />
            )}
            <Chip
              label={isOpening ? "영업중" : "영업종료"}
              active={isOpening}
            />
          </div>

          {/* 시간, 주소, 전화번호 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-gray-700">
              <Clock size={14} className="text-gray-400 shrink-0" />
              <span className="text-[13px]">
                {pharmacy.openingTime || "09:00~18:00"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <span className="text-[13px] line-clamp-1">
                {pharmacy.address}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Phone size={14} className="text-gray-400 shrink-0" />
              <span className="text-[12px]">
                {pharmacy.phone || "번호 없음"}
              </span>
            </div>
          </div>
        </div>

        {/* 2-2. 맵 (오른쪽) */}
        <div className="hidden md:flex w-60 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-50 shrink-0">
          {/* //TODO 실제 지도 연동하기 */}
          <div className="flex flex-col items-center gap-1">
            <MapPin size={18} className="text-gray-400" />
            <span className="text-[10px] text-gray-400 font-medium">MAP</span>
          </div>
        </div>
      </div>

      {/* 3. 메모 입력 */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 group focus-within:border-indigo-200 focus-within:bg-white transition-all">
        <Pencil
          size={14}
          className="text-gray-400 group-focus-within:text-indigo-500"
        />
        <input
          type="text"
          placeholder="메모를 입력하세요 (예: 비상약 보유 확인)"
          className="bg-transparent border-none outline-none text-[13px] w-full text-gray-600 placeholder:text-gray-400"
        />
      </div>

      {/* 4. 상세보기 */}
      <div
        onClick={onClick}
        className="flex justify-end items-center pt-2 border-t border-gray-50 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <div className="flex  items-center gap-1 text-gray-400">
          <span className="text-[11px]">상세보기</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

export default PharmacyFavoriteCard;
