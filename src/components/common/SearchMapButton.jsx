import React from "react";
import { RefreshCw } from "lucide-react";

const SearchInMapButton = ({ onClick }) => {
  return (
    <div className="absolute bottom-4 right-16 z-[50] pointer-events-none md:bottom-11 md:right-24">
      <button
        onClick={onClick}
        className="flex items-center gap-1 px-3.5 py-1.5 bg-sky-600 
        rounded-full shadow-xl text-white font-bold text-[11px] 
        hover:bg-sky-700 transition-all active:scale-95 pointer-events-auto
        whitespace-nowrap md:text-[14px] md:px-5 md:py-2.5"
      >
        <RefreshCw size={12} className="text-white md:w-4 md:h-4" />현 지도에서
        검색
      </button>
    </div>
  );
};

export default SearchInMapButton;
