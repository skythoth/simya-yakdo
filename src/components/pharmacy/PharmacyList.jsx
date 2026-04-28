import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown } from "lucide-react";
import PharmacyListCard from "./PharmacyListCard";
import PharmacyDetail from "./PharmacyDetail";
import EmptyState from "../common/EmptyState";
import PharmacyToggle from "./PharmacyToggle"; // 토글 버튼 임포트 확인
import { ADMINISTRATIVE_DISTRICTS } from "../../constants/filterOptions";
import useFilterStore from "../../stores/useFilterStore";

const PharmacyList = ({
  pharmacies = [],
  onSelect,
  selectedPharmacy,
  isOpen,
  onToggle,
  isHoliday,
}) => {
  const [openId, setOpenId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const {
    selectedSido,
    setSelectedSido,
    selectedDistrict,
    setSelectedDistrict,
    openFilter,
    setOpenFilter,
  } = useFilterStore();

  const districtOptions = ADMINISTRATIVE_DISTRICTS[selectedSido] ?? [];

  // 시/도 변경 핸들러
  const handleSidoChange = (value) => {
    setSelectedSido(value);
    const defaultDistrict = (ADMINISTRATIVE_DISTRICTS[value] ?? [""])[0] ?? "";
    setSelectedDistrict(defaultDistrict);
    setActiveDropdown(null);
  };

  // 구/군 변경 핸들러
  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setActiveDropdown(null);
  };

  const handleCardClick = (pharmacy) => {
    setOpenId(openId === pharmacy.id ? null : pharmacy.id);
    onSelect(pharmacy);
  };

  const cardRefs = useRef({});

  // 선택된 약국으로 스크롤 이동
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

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 스타일 정의
  const sideBar = `w-full md:w-[360px] 
  h-[60dvh] md:h-full z-50 bg-white 
  absolute bottom-0 left-0 md:top-0 
  shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto 
  pb-[env(safe-area-inset-bottom)]
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`;

  const dropdownTrigger =
    "flex items-center justify-between w-full border border-gray-300 px-3 py-2 text-[13px] text-gray-700 rounded-md bg-white cursor-pointer hover:border-indigo-300 transition-all";
  const dropdownList =
    "absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[100] max-h-60 overflow-y-auto no-scrollbar py-1";
  const dropdownItem =
    "px-4 py-2.5 text-[13px] text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors";

  return (
    <div className="absolute left-0 top-0 w-full h-full overflow-hidden z-50 pointer-events-none">
      <section className={sideBar} onClick={(e) => e.stopPropagation()}>
        <div className="h-full flex flex-col relative overflow-hidden">
          {/* 1. 헤더 및 필터 영역 */}
          <div className="relative z-30 p-4 border-b border-gray-200 bg-white shrink-0 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-700">약국 목록</h2>
              <button
                onClick={() => onToggle(false)}
                className="md:hidden p-1.5 hover:bg-gray-100 rounded-full"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex gap-2">
              {/* 시/도 드롭다운 */}
              <div className="relative flex-1">
                <div
                  className={dropdownTrigger}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(
                      activeDropdown === "sido" ? null : "sido",
                    );
                  }}
                >
                  <span className="truncate">
                    {selectedSido || "시/도 선택"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${activeDropdown === "sido" ? "rotate-180" : ""}`}
                  />
                </div>
                {activeDropdown === "sido" && (
                  <ul className={dropdownList}>
                    <li
                      className={dropdownItem}
                      onClick={() => handleSidoChange("")}
                    >
                      전체
                    </li>
                    {Object.keys(ADMINISTRATIVE_DISTRICTS).map((sido) => (
                      <li
                        key={sido}
                        className={dropdownItem}
                        onClick={() => handleSidoChange(sido)}
                      >
                        {sido}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 구/군 드롭다운 */}
              <div className="relative flex-1">
                <div
                  className={`${dropdownTrigger} ${!selectedSido ? "bg-gray-50 cursor-not-allowed opacity-60" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedSido)
                      setActiveDropdown(
                        activeDropdown === "district" ? null : "district",
                      );
                  }}
                >
                  <span className="truncate">
                    {selectedDistrict || "구/군 선택"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${activeDropdown === "district" ? "rotate-180" : ""}`}
                  />
                </div>
                {activeDropdown === "district" && selectedSido && (
                  <ul className={dropdownList}>
                    {districtOptions.map((district) => (
                      <li
                        key={district}
                        className={dropdownItem}
                        onClick={() => handleDistrictChange(district)}
                      >
                        {district}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 영업중 필터 */}
            <div className="relative w-full">
              <div
                className={dropdownTrigger}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(
                    activeDropdown === "status" ? null : "status",
                  );
                }}
              >
                <span>{openFilter === "영업중" ? "영업중" : "전체"}</span>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform ${activeDropdown === "status" ? "rotate-180" : ""}`}
                />
              </div>
              {activeDropdown === "status" && (
                <ul className={dropdownList}>
                  <li
                    className={dropdownItem}
                    onClick={() => {
                      setOpenFilter("");
                      setActiveDropdown(null);
                    }}
                  >
                    전체
                  </li>
                  <li
                    className={dropdownItem}
                    onClick={() => {
                      setOpenFilter("영업중");
                      setActiveDropdown(null);
                    }}
                  >
                    영업중
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* 2. 약국 리스트 영역 */}
          <div className="flex-1 relative z-10 overflow-y-auto space-y-2 custom-scrollbar p-3 pb-[calc(1rem+env(safe-area-inset-bottom))] ">
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
                    isHoliday={isHoliday}
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

      {/* 3. 토글 버튼 (사이드바 열기/닫기) */}
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
