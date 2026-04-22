// 지도 마커 데이터 관리 훅
// TODO: 약국 데이터를 마커 형태로 가공
import { useMemo } from 'react';

function useMapMarkers(pharmacies) {
  const markers = useMemo(() => {
    if (!pharmacies || pharmacies.length === 0) return [];

    // TODO: 약국 데이터 → 마커 데이터 변환
    return pharmacies.map((pharmacy) => ({
      id: pharmacy.id,
      position: { lat: pharmacy.lat, lng: pharmacy.lng },
      name: pharmacy.name,
    }));
  }, [pharmacies]);

  return { markers };
}

export default useMapMarkers;
