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

    //geolocation 사용 불가능할 경우
    if (!navigator.geolocation) {
      setError('브라우저가 위치 서비스를 지원하지 않습니다.');
      setLocation(DEFAULT_LOCATION);  //기본 좌표 설정
      setIsLoading(false);
      return;
    }

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
        setLocation(DEFAULT_LOCATION);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,  //타임아웃 5초 설정
        maximumAge: 300000, //캐시된 위치 사용 시간 5분 설정
      }
    );
  };

  return { location, error, isLoading, requestLocation };
}

export default useCurrentLocation;
