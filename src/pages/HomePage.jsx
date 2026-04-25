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
import Loading from "../components/common/Loading";

function HomePage() {
  const [pharmacies, setPharmacies] = useState([]);
  const { location, region } = useCurrentLocation();
  const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(false);
                                                                             
  useEffect(() => {
    if (!region) return;

    setIsLoadingPharmacies(true);  // 로딩 시작

    fetchNearbyPharmacies(region).then((data) => {  //region을 필수로 전달
      const items = data.response.body.items.item;  //api구조 변경으로 인한 수정
      const mapped = mapPharmacyListFromApi(items);

      const withDistance = mapped
        .map((p) => ({
          ...p,
          distance: calculateDistance(location.lat, location.lng, p.lat, p.lng),
        }))
        .filter((p) => p.distance <= 5000)
        .sort((a, b) => a.distance - b.distance);

      console.log("가까운 약국:", withDistance.length, "개");
      setPharmacies(withDistance);
      setIsLoadingPharmacies(false);  // 로딩 완료
    });
  }, [region]);   //지역이 확정되었을때만 api호출

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
        <Map
            pharmacies={pharmacies}
            onSelect={handleSelectPharmacy}
            selectedPharmacy={selectedPharmacy}
            location={location}
          />
      </section>

       {isLoadingPharmacies ? (
          <Loading message="약국 정보를 불러오는 중입니다..." />
        ) : (
          <PharmacyList
            pharmacies={pharmacies}
            onSelect={handleSelectPharmacy}
            selectedPharmacy={selectedPharmacy}
            location={location}
          />
        )}

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
