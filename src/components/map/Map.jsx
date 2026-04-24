import React from "react";
import { useEffect, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import Loading from "../common/Loading";
import LoadingSpinner from "../common/LoadingSpinner";

const Map = ({ pharmacies = [], onMarkerClick }) => {
  useKakaoLoader();
  const { location, isLoading, requestLocation } = useCurrentLocation();
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-100 flex flex-col items-center justify-center">
      {/* 카카오맵 */}
      <div id="map" className="absolute inset-0 w-full h-full">
        <KakaoMap // 지도를 표시할 Container
          id="maps"
          center={{ lat: location.lat, lng: location.lng }}
          style={{ width: "100%", height: "100%" }}
          level={3} // 지도의 확대 레벨
        >
          {pharmacies.map((pharmacy) => (
            <MapMarker
              key={pharmacy.id}
              position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
              title={pharmacy.name}
              onClick={() => onMarkerClick(pharmacy)}
            />
          ))}
        </KakaoMap>
      </div>
    </div>
  );
};

export default Map;
