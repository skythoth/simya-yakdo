import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import LoadingSpinner from "../common/LoadingSpinner";
import { getPharmacyStatus } from "../../utils/pharmacyStatus";
import { useGetHolidayQuery } from "../../hooks/useGetHoliday";
import useFilterStore from "../../stores/useFilterStore";
import useCurrentLocation from "../../hooks/useCurrentLocation";

const CLOSED_MARKER_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="29" height="42" viewBox="0 0 29 42">
    <path d="M14.5 0C6.5 0 0 6.5 0 14.5C0 25.3 14.5 42 14.5 42S29 25.3 29 14.5C29 6.5 22.5 0 14.5 0Z" fill="#9E9E9E"/>
    <circle cx="14.5" cy="14.5" r="5.5" fill="white"/>
  </svg>`,
)}`;

const Map = ({
  pharmacies = [],
  onSelect,
  selectedPharmacy,
  location,
  isListOpen,
}) => {
  useKakaoLoader();
  const isHoliday = useGetHolidayQuery().data;
  const mapRef = useRef(null);
  const [center, setCenter] = useState(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(pharmacies);
  }, [pharmacies]);

  // 최초: 현재 위치로 중심 설정
  useEffect(() => {
    if (location) {
      setCenter({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  // 리스트 열림/닫힘 시 지도 relayout
  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.relayout();
    }, 310);
    return () => clearTimeout(timer);
  }, [isListOpen]);

  // 약국 클릭 : 해당 좌표로 중심 이동
  useEffect(() => {
    if (selectedPharmacy) {
      setCenter({ lat: selectedPharmacy.lat, lng: selectedPharmacy.lng });
      console.log("지도 이동:", selectedPharmacy.lat, selectedPharmacy.lng);
    }
  }, [selectedPharmacy]);

  // 지역 선택 : 해당 좌표로 중심 이동
  const { selectedSido, selectedDistrict } = useFilterStore();
  useEffect(() => {
    if (selectedDistrict) {
      const regionQuery = [selectedSido, selectedDistrict]
        .filter(Boolean)
        .join(" ");

      if (!regionQuery || !window.kakao?.maps?.services) {
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      let isCancelled = false;

      geocoder.addressSearch(regionQuery, (result, status) => {
        if (
          isCancelled ||
          status !== window.kakao.maps.services.Status.OK ||
          !result?.[0]
        ) {
          return;
        }

        setCenter({
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        });
      });

      return () => {
        isCancelled = true;
      };
    } else {
      setCenter({ lat: location.lat, lng: location.lng });
    }
  }, [selectedDistrict]);

  if (!center) {
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
          center={center}
          isPanto={true}
          style={{ width: "100%", height: "100%" }}
          level={3} // 지도의 확대 레벨
          onCreate={(map) => (mapRef.current = map)}
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={6} // 클러스터 할 최소 지도 레벨
          >
            {pharmacies.map((pharmacy) => {
              const isOpen = getPharmacyStatus(
                pharmacy.operatingHours,
                isHoliday,
              );
              return (
                <MapMarker
                  key={pharmacy.id}
                  position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
                  onClick={() => onSelect(pharmacy)}
                  {...(!isOpen && {
                    image: {
                      src: CLOSED_MARKER_SRC,
                      size: { width: 29, height: 42 },
                    },
                  })}
                />
              );
            })}
          </MarkerClusterer>
        </KakaoMap>
      </div>
    </div>
  );
};

export default Map;
