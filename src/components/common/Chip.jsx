import React from "react";
import { Moon, Calendar } from "lucide-react";

function Chip({ label, active = false, variant = "default" }) {
  // 1. 기본스타일
  const baseClass =
    "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors";

  // 2. 변형스타일
  const variants = {
    midnight: "bg-indigo-50 border-indigo-100 text-indigo-600",
    active: "bg-slate-800 border-slate-800 text-white",
    inactive: "bg-gray-50 border-gray-200 text-gray-400 border",
    holiday: "bg-rose-50 border-rose-100 text-rose-500",
  };

  // 3. 색상 변형 클래스
  const getSelectedClass = () => {
    if (label === "영업중") return variants.active;
    if (label === "영업종료") return variants.inactive;

    // 그 외(심야, 공휴일) 칩들은 현재 영업중(active)일 때만 색깔이 나옴
    if (!active) return variants.inactive;

    if (variant === "midnight") return variants.midnight;
    if (variant === "holiday") return variants.holiday;

    return variants.inactive;
  };

  const selectedClass = getSelectedClass();

  return (
    <span className={`${baseClass} ${selectedClass}`}>
      {/* 야간운영 아이콘 추가*/}
      {active && variant === "midnight" && (
        <Moon size={11} className="fill-current" />
      )}
      {active && variant === "holiday" && <Calendar size={11} />}
      {label}
    </span>
  );
}

export default Chip;
