import React from "react";

const LoadingSpinner = ({ message = "정보를 불러오는 중입니다..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="relative">
        <div className="w-12 h-12 border-6  border-slate-200  rounded-full "></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-6 border-[#1a1a2e] border-t-transparent rounded-full animate-spin "></div>
      </div>
      <div className="mt-4 text-sm font-medium text-slate-600 animate-pulse">
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner;
