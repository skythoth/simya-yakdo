// 현재 위치(GPS) 커스텀 훅
// TODO: Geolocation API 연동
import { useState, useEffect } from 'react';

const DEFAULT_LOCATION = {
  lat: 37.5665, // 서울시청 기본 좌표
  lng: 126.978,
};

function useCurrentLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {                                                                            
    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('실제 좌표:', position.coords.latitude, position.coords.longitude);

        // TODO: 실제 좌표 사용 예정, 지금은 개발용 고정 좌표 (실 좌표 받아오는것 확인 완료)
        // setLocation({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        // });
        setLocation(DEFAULT_LOCATION);
        setIsLoading(false);
      },
      (err) => {
        console.error('위치 가져오기 실패:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    );
  };

  return { location, error, isLoading, requestLocation };
}

export default useCurrentLocation;
