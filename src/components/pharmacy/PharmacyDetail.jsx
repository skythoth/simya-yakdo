import React from "react";
import { X, Navigation } from "lucide-react";
import { formatOperatingHours } from "../../utils/pharmacyStatus";

function PharmacyDetail({ pharmacy, onClose }) {
  const operatingHours = formatOperatingHours(pharmacy.operatingHours);

  const handleDirections = () => {
    const url = `https://map.kakao.com/link/to/${pharmacy.name},${pharmacy.lat},${pharmacy.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 rounded-lg border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200/50 bg-white/50">
        <h3 className="text-[13px] font-bold text-slate-500">운영시간 상세</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>

      {/* 세부내용 */}
      <div className="px-4 py-3 bg-transparent">
        <ul className="space-y-2">
          {operatingHours.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-slate-500 font-medium text-[13px]">
                {item.day}
              </span>
              <span className="text-slate-800 font-bold text-[12px]">
                {item.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 안내 */}
      <p className="text-[11px] text-gray-400 px-4 pb-2 text-center leading-tight">
        실제 운영 시간은 현장 상황에 따라 다를 수 있습니다.
      </p>

      {/* 카카오맵 */}
      <div className="px-3 py-2 bg-slate-50/50 border-t border-gray-100">
        <button
          onClick={handleDirections}
          className="w-full flex items-center justify-center gap-2 bg-[#FAE100] active:bg-[#F7E600] text-[#3c1e1e] font-bold py-2.5 rounded-lg text-[13px] shadow-sm"
        >
          <Navigation size={14} className="fill-current" />
          카카오맵 길찾기
        </button>
      </div>
    </div>
  );
}

export default PharmacyDetail;
