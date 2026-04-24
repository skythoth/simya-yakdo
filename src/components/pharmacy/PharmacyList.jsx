import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PharmacyListCard from "./PharmacyListCard";
import PharmacyDetail from "./PharmacyDetail";
import EmptyState from "../common/EmptyState";
import { useGetPharmacyQuery } from "../../hooks/useGetPharmacy";
import LoadingSpinner from "../common/LoadingSpinner";

const DAY_KOR = {
  monday: "월요일",
  tuesday: "화요일",
  wednesday: "수요일",
  thursday: "목요일",
  friday: "금요일",
  saturday: "토요일",
  sunday: "일요일",
  holiday: "공휴일",
};

const PharmacyList = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState(null);
  const {
    data: pharmacies = [],
    isLoading,
    isError,
    error,
  } = useGetPharmacyQuery(37.5666, 126.9784);

  const handleCardClick = (pharmacy) => {
    setOpenId(openId === pharmacy.id ? null : pharmacy.id);
    onSelect(pharmacy);
  };

  // style components
  const sideBar = `w-full md:w-[360px] h-full z-50 bg-white shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`;
  const toggleBtn = `absolute top-1/2 z-30 flex h-16 w-8 -translate-y-1/2 items-center justify-center bg-white border border-l-0 border-gray-300 shadow-md transition-all duration-300 pointer-events-auto
          ${isOpen ? "left-[100%] md:left-[360px]" : "left-0"}`;

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="absolute left-0 top-0 h-full z-50 pointer-events-none">
      {/*  1. 사이드바  */}

      <section className={sideBar}>
        <div className="h-full flex flex-col">
          <div className="p-5 border-b bg-white">
            <h2 className="text-xl font-bold">약국 목록</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {!pharmacies || pharmacies.length === 0 ? (
              <EmptyState message="주변 약국 정보가 없습니다." />
            ) : (
              pharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="flex flex-col">
                  <PharmacyListCard
                    pharmacy={pharmacy}
                    onClick={() => handleCardClick(pharmacy)}
                  />
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out rounded-b-lg
                               ${openId === pharmacy.id ? "max-h-[800px] opacity-100 p-2 " : "max-h-0 opacity-0"}`}
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={toggleBtn}
        style={{ borderRadius: "0 40px 40px 0" }}
      >
        {isOpen ? (
          <ChevronLeft className="text-gray-600 size={20}" />
        ) : (
          <ChevronRight className="text-gray-600 size={20}" />
        )}
      </button>
    </div>
  );
};

export default PharmacyList;
