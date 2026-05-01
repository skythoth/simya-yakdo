import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { ADMINISTRATIVE_DISTRICTS } from "../../constants/filterOptions";
import useFilterStore from "../../stores/useFilterStore";

const PharmacyFilter = ({ isFilter, setIsFilter, onToggle, setMapBounds }) => {
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
    setMapBounds(null);
  };

  // 구/군 변경 핸들러
  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setActiveDropdown(null);
    setMapBounds(null);
  };

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const dropdownTrigger =
    "flex items-center justify-between w-full border border-gray-300 px-3 py-2 text-[13px] text-gray-700 rounded-md bg-white cursor-pointer hover:border-indigo-300 transition-all";
  const dropdownList =
    "absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-[100] max-h-60 overflow-y-auto no-scrollbar py-1";
  const dropdownItem =
    "px-4 py-2.5 text-[13px] text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors";

  return (
    <div
      className={`relative z-30 p-4 border-b border-gray-200 bg-white shrink-0 flex flex-col transition-all ${
        isFilter ? "gap-3" : "gap-0"
      }`}
    >
      {/* 제목 및 토글 버튼 */}
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsFilter(!isFilter)}
      >
        <div className="flex items-center gap-1">
          <h2 className="text-base font-bold text-gray-700">약국 찾기</h2>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${
              isFilter ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(false);
          }}
          className="md:hidden p-1.5 hover:bg-gray-100 rounded-full"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      {/* 필터 드롭다운 영역 */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ease-in-out ${
          isFilter
            ? "max-h-[300px] opacity-100 overflow-visible"
            : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
        }`}
      >
        <div className="flex gap-2">
          {/* 시/도 드롭다운 */}
          <div className="relative flex-1">
            <div
              className={dropdownTrigger}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "sido" ? null : "sido");
              }}
            >
              <span className="truncate">{selectedSido || "시/도 선택"}</span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform ${
                  activeDropdown === "sido" ? "rotate-180" : ""
                }`}
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
              className={`${dropdownTrigger} ${
                !selectedSido ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
              }`}
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
                className={`text-gray-400 transition-transform ${
                  activeDropdown === "district" ? "rotate-180" : ""
                }`}
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

        {/* 영업중 필터
        <div className="relative w-full">
          <div
            className={dropdownTrigger}
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === "status" ? null : "status");
            }}
          >
            <span>{openFilter === "영업중" ? "영업중" : "전체"}</span>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${
                activeDropdown === "status" ? "rotate-180" : ""
              }`}
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
        </div> */}
      </div>
    </div>
  );
};

export default PharmacyFilter;
