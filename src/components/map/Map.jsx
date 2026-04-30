import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  MarkerClusterer,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import LoadingSpinner from "../common/LoadingSpinner";
import { getPharmacyStatus } from "../../utils/pharmacyStatus";
import { useGetHolidayQuery } from "../../hooks/useGetHoliday";
import useFilterStore from "../../stores/useFilterStore";
import useCurrentLocation from "../../hooks/useCurrentLocation";

const createMarkerSvg = (fillColor) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="44" viewBox="0 0 33 44">
      <path d="M16.5 1C8 1 1 8 1 16.5C1 27.4 16.5 43 16.5 43S32 27.4 32 16.5C32 8 25 1 16.5 1Z" fill="${fillColor}" stroke="white" stroke-width="1.5"/>
      <circle cx="16.5" cy="16.5" r="5.5" fill="white"/>
    </svg>`,
  )}`;

const OPEN_MARKER_SRC = createMarkerSvg("#E74C3C");
const CLOSED_MARKER_SRC = createMarkerSvg("#9E9E9E");

const Map = ({
  pharmacies = [],
  onSelect,
  selectedPharmacy,
  location,
  isListOpen,
  onMapReady,
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
          onCreate={(map) => {
            mapRef.current = map;
            onMapReady?.({
              goToCurrentLocation: () => {
                if (location) {
                  setCenter({ lat: location.lat, lng: location.lng });
                }
              },
            });
          }}
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
              const isSelected = selectedPharmacy?.id === pharmacy.id;
              return (
                <React.Fragment key={pharmacy.id}>
                  <MapMarker
                    position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
                    onClick={() => onSelect(pharmacy)}
                    image={{
                      src: isOpen ? OPEN_MARKER_SRC : CLOSED_MARKER_SRC,
                      size: { width: 33, height: 44 },
                    }}
                    clickable={true}
                  />
                  {isSelected && (
                    <CustomOverlayMap
                      position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
                      yAnchor={2.6}
                    >
                      <div className="marker-overlay">
                        <span>{pharmacy.name}</span>
                        <div className="marker-overlay-arrow" />
                      </div>
                    </CustomOverlayMap>
                  )}
                </React.Fragment>
              );
            })}
          </MarkerClusterer>
        </KakaoMap>
      </div>
    </div>
  );
};

export default Map;
