import React from "react";
import {useEffect, useState} from "react";
import { Map as KakaoMap, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import LoadingSpinner from "../common/LoadingSpinner";

const Map = ({ pharmacies = [], onSelect, selectedPharmacy, location }) => {
  useKakaoLoader()
  const [center, setCenter] = useState(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(pharmacies);
  },[pharmacies])

  // 최초: 현재 위치로 중심 설정                                            
  useEffect(() => {                                                         
    if (location) {                                              
      setCenter({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  // 약국 클릭 : 해당 좌표로 중심 이동
  useEffect(() => {
    if(selectedPharmacy) {
      setCenter({ lat: selectedPharmacy.lat, lng: selectedPharmacy.lng });
      console.log("지도 이동:", selectedPharmacy.lat, selectedPharmacy.lng);
    }
  },[selectedPharmacy])

  if (!center) {
      return <div><LoadingSpinner /></div>;
  }

  return (
    <div className="relative w-full h-full bg-gray-100 flex flex-col items-center justify-center">
      {/* 카카오맵 */}
      <div id="map" className="absolute inset-0 w-full h-full">
        <KakaoMap // 지도를 표시할 Container
          id="maps"
          center={center}
          isPanto={true}
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
                onClick={() => onSelect(pharmacy)}
              />
            ))}
          </MarkerClusterer>
        </KakaoMap>
      </div>
    </div>
  );
};

export default Map;
