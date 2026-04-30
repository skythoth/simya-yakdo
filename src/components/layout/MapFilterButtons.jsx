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
    // 가로정렬
    <div className="flex flex-row gap-1.5 md:gap-2 items-center pointer-events-none">
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
