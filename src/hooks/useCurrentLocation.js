// 현재 위치(GPS) 커스텀 훅
// TODO: Geolocation API 연동
import { useState } from 'react';

const DEFAULT_LOCATION = {
  lat: 37.5665, // 서울시청 기본 좌표
  lng: 126.978,
};

function useCurrentLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = () => {
    // TODO: navigator.geolocation.getCurrentPosition 연동
    console.log('위치 요청 - 현재는 기본 좌표 사용');
    setLocation(DEFAULT_LOCATION);
  };

  return { location, error, isLoading, requestLocation };
}

export default useCurrentLocation;
