import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import PharmacyListCard from "./PharmacyListCard";
import PharmacyDetail from "./PharmacyDetail";
import EmptyState from "../common/EmptyState";
// import { useGetPharmacyQuery } from "../../hooks/useGetPharmacy";
import LoadingSpinner from "../common/LoadingSpinner";
import PharmacyToggle from "./PharmacyToggle";
import { useGetHolidayQuery } from "../../hooks/useGetHoliday";
import { ADMINISTRATIVE_DISTRICTS } from "../../constants/filterOptions";
import useFilterStore from "../../stores/useFilterStore";

const PharmacyList = ({
  pharmacies = [],
  onSelect,
  selectedPharmacy,
  isOpen,
  onToggle,
}) => {
  const [openId, setOpenId] = useState(null);

  const {
    selectedSido,
    setSelectedSido,
    selectedDistrict,
    setSelectedDistrict,
    openFilter,
    setOpenFilter,
  } = useFilterStore();

  const isHoliday = useGetHolidayQuery().data;
  const districtOptions = ADMINISTRATIVE_DISTRICTS[selectedSido] ?? [];

  const handleCardClick = (pharmacy) => {
    setOpenId(openId === pharmacy.id ? null : pharmacy.id);
    onSelect(pharmacy);
  };

  const cardRefs = useRef({});

  // 선택된 약국으로 자동 스크롤 (이전 상세정보 닫힘 애니메이션 후)
  useEffect(() => {
    if (selectedPharmacy && cardRefs.current[selectedPharmacy.id]) {
      const timer = setTimeout(() => {
        cardRefs.current[selectedPharmacy.id]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 320);
      return () => clearTimeout(timer);
    }
  }, [selectedPharmacy]);

  // style components
  const sideBar = `w-full md:w-[360px] 
  h-[60dvh] md:h-full z-50 bg-white 
  absolute bottom-0 left-0 md:top-0 
  shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto 
  pb-[env(safe-area-inset-bottom)]
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`;

  // if (isLoading) return <LoadingSpinner />;
  return (
    <div className="absolute left-0 top-0 w-full h-full overflow-hidden z-50 pointer-events-none">
      {/*  1. 사이드바  */}
      <section className={sideBar}>
        <div className="h-full flex flex-col relative overflow-hidden">
          <div className="relative z-30 p-4 border-b bg-white shrink-0 flex justify-between items-center">
            <h2 className="text-xl font-bold">약국 목록</h2>
            <button
              onClick={() => onToggle(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          {/* 임시 필터 */}
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
            <select
              value={selectedSido}
              onChange={(event) => {
                const nextSido = event.target.value;
                setSelectedSido(nextSido);
                setSelectedDistrict(
                  (ADMINISTRATIVE_DISTRICTS[nextSido] ?? [""])[0] ?? "",
                );
              }}
              className="rounded-full border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none"
              aria-label="시도 선택"
            >
              <option value="">전체</option>
              {Object.keys(ADMINISTRATIVE_DISTRICTS).map((sido) => (
                <option key={sido} value={sido}>
                  {sido}
                </option>
              ))}
            </select>
            {selectedSido && (
              <select
                value={selectedDistrict}
                onChange={(event) => setSelectedDistrict(event.target.value)}
                className="rounded-full border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none"
                aria-label="시군구 선택"
              >
                {districtOptions.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            )}
            <select
              value={openFilter}
              onChange={(event) => setOpenFilter(event.target.value)}
              className="rounded-full border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none"
              aria-label="영업시간"
            >
              <option value={"전체"}>전체</option>
              <option value={"영업중"}>영업중</option>
            </select>
          </div>
          <div className="mb-2"></div>
          {/* 약국리스트 보이기 */}
          <div className="flex-1 relative  z-10 overflow-y-auto space-y-2 custom-scrollbar p-3 pb-[calc(1rem+env(safe-area-inset-bottom))] ">
            {!pharmacies || pharmacies.length === 0 ? (
              <EmptyState message="주변 약국 정보가 없습니다." />
            ) : (
              pharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  ref={(el) => (cardRefs.current[pharmacy.id] = el)}
                  className="flex flex-col"
                >
                  <PharmacyListCard
                    pharmacy={pharmacy}
                    onClick={() => handleCardClick(pharmacy)}
                    isActive={selectedPharmacy?.id === pharmacy.id}
                  />
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out rounded-b-lg
                               ${openId === pharmacy.id ? "max-h-[1000px] opacity-100 p-2 " : "max-h-0 opacity-0"}`}
                  >
                    <PharmacyDetail
                      pharmacy={pharmacy}
                      onClose={() => setOpenId(null)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/*  2. 토글버튼  */}
      <div
        className={`transition-all duration-100 
          ${
            isOpen
              ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
              : "opacity-100 pointer-events-auto delay-300 md:delay-0"
          }
          mb-[env(safe-area-inset-bottom)]`}
      >
        <PharmacyToggle isOpen={isOpen} onClick={() => onToggle(!isOpen)} />
      </div>
    </div>
  );
};

export default PharmacyList;
