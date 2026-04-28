import React from "react";
import { Moon, Calendar, Clock } from "lucide-react";
import useFilterStore from "../../stores/useFilterStore";
import FilterButton from "../common/FilterButton";

const MapFilterButtons = () => {
  const {
    openFilter,
    setOpenFilter,
    lateNightFilter,
    setLateNightFilter,
    holidayFilter,
    setHolidayFilter,
  } = useFilterStore();

  return (
    // 📍 flex-row로 변경하여 가로 일렬 배치, items-center로 정렬
    <div className="absolute top-4 right-4 z-[40] flex flex-row gap-2 items-center pointer-events-none">
      {/* 1. 영업중 필터 */}
      <FilterButton
        label="영업중"
        icon={Clock}
        active={openFilter === "영업중"}
        activeColor="indigo" // 활성화 시 아이콘에 들어갈 색상
        onClick={() => setOpenFilter(openFilter === "영업중" ? "" : "영업중")}
      />

      {/* 2. 야간운영 필터 */}
      <FilterButton
        label="야간운영"
        icon={Moon}
        active={lateNightFilter}
        activeColor="purple"
        onClick={() => setLateNightFilter(!lateNightFilter)}
      />

      {/* 3. 공휴일운영 필터 */}
      <FilterButton
        label="공휴일운영"
        icon={Calendar}
        active={holidayFilter}
        activeColor="rose"
        onClick={() => setHolidayFilter(!holidayFilter)}
      />
    </div>
  );
};

export default MapFilterButtons;
