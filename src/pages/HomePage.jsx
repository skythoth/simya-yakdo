// 메인 페이지 - 지도 + 약국 리스트 조합
import { useState } from "react";
import Map from "../components/map/Map";
import PharmacyList from "../components/pharmacy/PharmacyList";
// import PharmacyDetailModal from "../components/pharmacy/PharmacyDetailModal";
import { mockPharmacies } from "../mocks/pharmacies";

function HomePage() {
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
        <Map pharmacies={mockPharmacies} onMarkerClick={handleSelectPharmacy} />
      </section>

      <PharmacyList
        pharmacies={mockPharmacies}
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
