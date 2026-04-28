import React, { useState, useEffect, useRef } from "react";
import PharmacyListCard from "./PharmacyListCard";
import PharmacyDetail from "./PharmacyDetail";
import EmptyState from "../common/EmptyState";
import PharmacyToggle from "./PharmacyToggle";
import PharmacyFilter from "./PharmacyFilter";

const PharmacyList = ({
  pharmacies = [],
  onSelect,
  selectedPharmacy,
  isOpen,
  onToggle,
  isHoliday,
}) => {
  const [openId, setOpenId] = useState(null);
  const [isFilter, setIsFilter] = useState(true);
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

  const sideBar = `w-full md:w-[360px] 
  h-[60dvh] md:h-full z-50 bg-white 
  absolute bottom-0 left-0 md:top-0 
  shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto 
  pb-[env(safe-area-inset-bottom)]
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`;

  return (
    <div className="absolute left-0 top-0 w-full h-full overflow-hidden z-50 pointer-events-none">
      <section className={sideBar} onClick={(e) => e.stopPropagation()}>
        <div className="h-full flex flex-col relative overflow-hidden">
          {/* 1. 헤더 및 필터 컴포넌트로 교체 */}
          <PharmacyFilter
            isFilter={isFilter}
            setIsFilter={setIsFilter}
            onToggle={onToggle}
          />

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
                    onSelect={onSelect}
                    onToggleDetail={() =>
                      setOpenId(openId === pharmacy.id ? null : pharmacy.id)
                    }
                    isActive={openId === pharmacy.id}
                    isSelected={selectedPharmacy?.id === pharmacy.id}
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

      {/* 3. 토글 버튼 */}
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
