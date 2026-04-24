// 현재 위치(GPS) 커스텀 훅
// TODO: Geolocation API 연동
import { useState, useEffect } from 'react';

const DEFAULT_LOCATION = {
  lat: 37.5665, // 서울시청 기본 좌표
  lng: 126.978,
};


function useCurrentLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [region, setRegion] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestLocation();
  }, []);

  // 좌표 → 시/도 변환
  const getRegionFromCoords = (lat, lng) => {
    if (!window.kakao?.maps?.services) {    //카카오맵 로딩 안됐을때
      console.log("카카오맵 미로딩 - 역지오코딩 스킵");
      return;
    }
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // result[0].region_1depth_name → "서울특별시"
        // 앞 2글자만 사용 → "서울"
        const sido = result[0].region_1depth_name.slice(0, 2);
        console.log("현재 지역:", sido);
        setRegion(sido);
      }
    });
  }


  const requestLocation = () => {                                                                            
    setIsLoading(true);
    setError(null);

    //geolocation 사용 불가능할 경우
    if (!navigator.geolocation) {
      setError('브라우저가 위치 서비스를 지원하지 않습니다.');
      setLocation(DEFAULT_LOCATION);  //기본 좌표 설정
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        //실제 좌표 사용
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
        getRegionFromCoords(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError(err.message);
        setLocation(DEFAULT_LOCATION);
        setIsLoading(false);
        getRegionFromCoords(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);  // 에러시 기본 좌표로 역지오코딩
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,  //타임아웃 5초 설정
        maximumAge: 300000, //캐시된 위치 사용 시간 5분 설정
      }
    );
  };

  return { location, region, error, isLoading, requestLocation };
}

export default useCurrentLocation;
