import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const PharmacyToggle = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute z-30 flex flex-col items-center justify-center 
      bg-white border-2 border-l-0 border-[#1a1a2e] shadow-xl 
      transition-all duration-300 pointer-events-auto 
      top-[80%] -translate-y-1/2 h-40 w-11 rounded-r-2xl p-3
      ${isOpen ? "left-[90vw] md:left-[360px]" : "left-0"}`}
    >
      <div className="flex items-center justify-center ">
        {isOpen ? (
          <ChevronLeft className="text-[#1a1a2e]" size={24} />
        ) : (
          <ChevronRight className="text-[#1a1a2e]" size={24} />
        )}
      </div>
      <div className="flex items-center justify-center h-24">
        <span className="whitespace-nowrap text-[#1a1a2e] text-[12px] font-bold -rotate-90 origin-center">
          약국 리스트 보기
        </span>
      </div>
    </button>
  );
};

export default PharmacyToggle;
