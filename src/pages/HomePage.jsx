// 메인 페이지 - 지도 + 약국 리스트 조합
import { useEffect, useState } from "react";
import Map from "../components/map/Map";
import PharmacyList from "../components/pharmacy/PharmacyList";
// import PharmacyDetailModal from "../components/pharmacy/PharmacyDetailModal";
import { mockPharmacies } from "../mocks/pharmacies";
import { fetchNearbyPharmacies } from "../services/pharmacy/pharmacyApi";
import { mapPharmacyListFromApi } from "../services/pharmacy/pharmacyMapper";
import { calculateDistance } from "../utils/distance";
import useCurrentLocation from "../hooks/useCurrentLocation";

function HomePage() {
  const [pharmacies, setPharmacies] = useState([]);
  const { location } = useCurrentLocation();
                                                                             
  useEffect(() => {                                                                                          
    fetchNearbyPharmacies().then((data) => {
      const mapped = mapPharmacyListFromApi(data.body);

      // 현재 위치 기준 거리 계산 + 정렬
      const withDistance = mapped
        .map((p) => ({
          ...p,
          distance: calculateDistance(location.lat, location.lng, p.lat, p.lng),
        }))
        .filter((p) => p.distance <= 5000)  // 반경 5km
        .sort((a, b) => a.distance - b.distance);

      console.log("가까운 약국:", withDistance.length, "개");
      setPharmacies(withDistance);

      // console.log('변환된 데이터', mapped);
      // setPharmacies(mapped);
    });
  }, [location]);

  // TODO: usePharmacyStore에서 상태 가져오기
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const handleSelectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleCloseModal = () => {
    setSelectedPharmacy(null);
  };

  return (
    <div className="home-page relative w-full h-full">
      <section className="map-section absolute inset-0 z-0 items-center justify-center">
        {/* MapView --> Map으로 변경 (임시) */}
        <Map pharmacies={pharmacies} onMarkerClick={handleSelectPharmacy} />
      </section>

      <PharmacyList
        pharmacies={pharmacies}
        onSelect={handleSelectPharmacy}
      />

      {/* {selectedPharmacy && (
        <PharmacyDetailModal
          pharmacy={selectedPharmacy}
          onClose={handleCloseModal}
        />
      )} */}
    </div>
  );
}

export default HomePage;
