import React, { useState, useEffect, useRef } from "react";
<<<<<<< HEAD

=======
>>>>>>> temp
import { X, ChevronDown } from "lucide-react";
import PharmacyListCard from "./PharmacyListCard";
import PharmacyDetail from "./PharmacyDetail";
import EmptyState from "../common/EmptyState";
import PharmacyToggle from "./PharmacyToggle";
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

  // 필터링 함수
  const handleSidoChange = (value) => {
    const nextSido = value;
    // 시,도 상태 업데이트
    setSelectedSido(nextSido);
    const defaultDistrict =
      (ADMINISTRATIVE_DISTRICTS[nextSido] ?? [""])[0] ?? "";
    setSelectedDistrict(defaultDistrict);
    setActiveDropdown(null);
  };
  // 구 선택하기
  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setActiveDropdown(null);
  };

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

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // style components
  const sideBar = `w-full md:w-[360px] 
  h-[60dvh] md:h-full z-50 bg-white 
  absolute bottom-0 left-0 md:top-0 
  shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto 
  pb-[env(safe-area-inset-bottom)]
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`;

  // 셀렉트 드롭다운 스타일
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
                      전체(시/도)
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

          <div className="mb-2"></div>

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
