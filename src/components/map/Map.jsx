import React from "react";
import {useEffect, useState} from "react";
import { Map as KakaoMap, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import useCurrentLocation from "../../hooks/useCurrentLocation";

const Map = ({ pharmacies = [], onMarkerClick }) => {
  useKakaoLoader()
  const { location, isLoading } = useCurrentLocation();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(pharmacies);
  },[pharmacies])

  if (isLoading) {
    return <div>위치를 가져오는 중...</div>;
  }

  return (
    <div className="relative w-full h-full bg-gray-100 flex flex-col items-center justify-center">
      {/* 카카오맵 */}
      <div id="map" className="absolute inset-0 w-full h-full">
        {/* 지도가 로드될 때 */}
        {/* <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <p className="font-medium">지도 데이터를 불러오는 중입니다...</p>
          <p className="text-xs mt-2">
            현재 표시될 약국: {pharmacies.length}개
          </p>
        </div> */}

        <KakaoMap // 지도를 표시할 Container
          id="maps"
          center={{ lat: location.lat, lng: location.lng }}
          style={{ width: "100%", height: "100%" }}
          level={3} // 지도의 확대 레벨
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={6} // 클러스터 할 최소 지도 레벨
          >
            {pharmacies.map((pharmacy) => (
              <MapMarker 
                key={pharmacy.id}
                position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
                //title={pharmacy.name}
                onClick={() => onMarkerClick(pharmacy)}
              />
            ))}
          </MarkerClusterer>
        </KakaoMap>
      </div>
    </div>
  );
};

export default Map;
