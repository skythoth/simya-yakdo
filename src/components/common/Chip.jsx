import React from "react";
import { Moon } from "lucide-react";

function Chip({ label, active = false, variant = "default", onClick }) {
  // 1. 기본스타일
  const baseClass =
    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors";

  // 2. 변형스타일
  const variants = {
    // 야간운영
    midnight: "bg-indigo-700 text-white",
    // 영업중
    active: "bg-[#1a1a2e] text-white",
    // 영업종료/정보부족
    inactive: "bg-gray-100 text-gray-500",
    // 공휴일 운영
    holiday: "bg-red-500 text-white",
  };

  // 3. 클래스
  const isMidnight = variant === "midnight";
  const isHoliday = variant === "holiday";
  const selectedClass = isMidnight
    ? variants.midnight
    : isHoliday
      ? variants.holiday
      : active
        ? variants.active
        : variants.inactive;

  return (
    <span
      className={`${baseClass} ${selectedClass} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {/* 야간운영 아이콘 추가*/}
      {isMidnight && <Moon size={12} className="fill-current" />}
      {label}
    </span>
  );
}

export default Chip;
