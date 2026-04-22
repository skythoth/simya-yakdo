// 메인 페이지 - 지도 + 약국 리스트 조합
import { useState } from 'react';
import MapView from '../components/map/MapView';
import PharmacyList from '../components/pharmacy/PharmacyList';
import PharmacyDetailModal from '../components/pharmacy/PharmacyDetailModal';
import { mockPharmacies } from '../mocks/pharmacies';

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
    <div className="home-page">
      <section className="map-section">
        <MapView pharmacies={mockPharmacies} onMarkerClick={handleSelectPharmacy} />
      </section>

      <section className="list-section">
        <PharmacyList
          pharmacies={mockPharmacies}
          onSelect={handleSelectPharmacy}
        />
      </section>

      {selectedPharmacy && (
        <PharmacyDetailModal
          pharmacy={selectedPharmacy}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default HomePage;
