import React from "react";

const Map = ({ pharmacies = [], onMarkerClick }) => {
  return (
    <div className="relative w-full h-full bg-gray-100 flex flex-col items-center justify-center">
      {/* 카카오맵 */}
      <div id="map" className="absolute inset-0 w-full h-full">
        {/* 지도가 로드될 때 */}
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <p className="font-medium">지도 데이터를 불러오는 중입니다...</p>
          <p className="text-xs mt-2">
            현재 표시될 약국: {pharmacies.length}개
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
