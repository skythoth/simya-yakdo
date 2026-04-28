// 메인 페이지 - 지도 + 약국 리스트 조합
import { useEffect, useState } from "react";
import Map from "../components/map/Map";
import PharmacyList from "../components/pharmacy/PharmacyList";
// import PharmacyDetailModal from "../components/pharmacy/PharmacyDetailModal";
import Loading from "../components/common/Loading";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { useGetPharmacyQuery } from "../hooks/useGetPharmacy";
import { calculateDistance } from "../utils/distance";
import useFilterStore from "../stores/useFilterStore";
import { getPharmacyStatus } from "../utils/pharmacyStatus";
import { useGetHolidayQuery } from "../hooks/useGetHoliday";
import MapFilterButtons from "../components/layout/MapFilterButtons";

function HomePage() {
  const [pharmacies, setPharmacies] = useState([]);
  const { location, region } = useCurrentLocation();
  const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const isHoliday = useGetHolidayQuery().data;
  const { selectedSido, selectedDistrict, openFilter } = useFilterStore();

  // TODO: useGetPharmacyQuery로 대체, 검토 필요

  const { data, isLoading } = useGetPharmacyQuery();
  useEffect(() => {
    if (!location) return;
    if (data) {
      const withDistance = data
        .map((p) => ({
          ...p,
          distance: calculateDistance(location.lat, location.lng, p.lat, p.lng),
        }))
        .filter((p) => {
          if (selectedDistrict) return true;
          else return p.distance <= 2000;
        })

        .filter((p) =>
          selectedDistrict
            ? p.address.includes(selectedSido + " " + selectedDistrict)
            : true,
        )
        .filter((p) => {
          if (openFilter === "") return true;
          if (openFilter === "영업중")
            return getPharmacyStatus(p.operatingHours, isHoliday);
        })
        .filter((p) => {
          if (p.lat) return true;
        })
        .filter((p) => {
          if (p.lng) return true;
        })
        .sort((a, b) => a.distance - b.distance);
      console.log("가까운 약국:", withDistance.length, "개");
      setPharmacies(withDistance);
    } else {
      setPharmacies([]);
    }
  }, [data, location, selectedDistrict, openFilter]);

  // useEffect(() => {
  //   if (!region) return;

  //   setIsLoadingPharmacies(true); // 로딩 시작

  //   fetchNearbyPharmacies(region).then((data) => {
  //     //region을 필수로 전달
  //     const items = data.response.body.items.item; //api구조 변경으로 인한 수정
  //     const mapped = mapPharmacyListFromApi(items);

  //     const withDistance = mapped
  //       .map((p) => ({
  //         ...p,
  //         distance: calculateDistance(location.lat, location.lng, p.lat, p.lng),
  //       }))
  //       .filter((p) => p.distance <= 5000)
  //       .sort((a, b) => a.distance - b.distance);

  //     console.log("가까운 약국:", withDistance.length, "개");
  //     setPharmacies(withDistance);
  //     setIsLoadingPharmacies(false); // 로딩 완료
  //   });
  // }, [region]); //지역이 확정되었을때만 api호출

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
      <section
        className={`map-section absolute top-0 right-0 z-0 items-center justify-center transition-all duration-300 ease-in-out
        ${isListOpen ? "bottom-[60dvh] left-0 md:bottom-0 md:left-[360px]" : "bottom-0 left-0"}`}
      >
        {/* 필터링 버튼 */}
        <div className="hidden md:block">
          <MapFilterButtons />
        </div>

        {/* 맵 */}
        <Map
          pharmacies={pharmacies}
          onSelect={handleSelectPharmacy}
          selectedPharmacy={selectedPharmacy}
          location={location}
          isListOpen={isListOpen}
        />
      </section>

      {isLoading ? (
        <Loading message="약국 정보를 불러오는 중입니다..." />
      ) : (
        <PharmacyList
          pharmacies={pharmacies}
          onSelect={handleSelectPharmacy}
          selectedPharmacy={selectedPharmacy}
          location={location}
          isOpen={isListOpen}
          isHoliday={isHoliday}
          onToggle={setIsListOpen}
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
