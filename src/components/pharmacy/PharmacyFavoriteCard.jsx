import React, { useState } from "react";
import {
  Heart,
  MapPin,
  Phone,
  Clock,
  Pencil,
  Navigation,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Chip from "../common/Chip";
import { StaticMap } from "react-kakao-maps-sdk";
import { formatOperatingHours } from "../../utils/pharmacyStatus";
import {
  getPharmacyStatus,
  isLateNightPharmacy,
} from "../../utils/pharmacyStatus";
import usePharmacyStore from "../../stores/usePharmacyStore";

function PharmacyFavoriteCard({ pharmacy, isHoliday }) {
  const { toggleFavorite } = usePharmacyStore();
  const [isExpanded, setIsExpended] = useState(false);
  // 날짜
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  // 시간
  const isOpening = getPharmacyStatus(pharmacy.operatingHours, isHoliday);
  const isMidnight = isLateNightPharmacy(pharmacy.operatingHours);
  const holidayOpen = pharmacy.operatingHours.holiday?.open ? true : false;

  const operatingHours = formatOperatingHours(pharmacy.operatingHours);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pharmacy);
  };

  const handleDirections = () => {
    const url = `https://map.kakao.com/link/to/${pharmacy.name},${pharmacy.lat},${pharmacy.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 md:p-10 mb-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-4">
      {/* 1. 상단: 약국이름 및 하트 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 min-w-0">
          <strong className="text-[18px] text-gray-900 font-bold truncate">
            {pharmacy.name}
          </strong>
        </div>
        <button className="p-1 -mt-1 -mr-1">
          <Heart size={22} className="text-red-700 fill-red-700" />
        </button>
      </div>

      {/* 2. 메인 콘텐츠 */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* 2-1. 왼쪽 영역: 정보 및 지도 */}
        <div className="flex-1 flex flex-col gap-3">
          {/* 칩 세트 */}
          <div className="flex items-center gap-1.5">
            <Chip
              label={isOpening ? "영업중" : "영업종료"}
              active={isOpening}
            />
            {isMidnight && (
              <Chip label="야간운영" variant="midnight" active={isOpening} />
            )}
            {holidayOpen && (
              <Chip label="공휴일운영" variant="holiday" active={isOpening} />
            )}
          </div>

          {/* 세부 정보 리스트 */}
          <div className="flex flex-col gap-2">
            {/* 주소 */}
            <div className="flex items-start gap-1.5 text-gray-700">
              <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
              <span className="text-[13px] font-medium leading-snug break-keep">
                {pharmacy.address}
              </span>
            </div>

            {/* 시간 */}
            <div className="flex items-center gap-1.5 text-gray-700">
              <Clock size={14} className="text-gray-400 shrink-0" />
              <span className="text-[13px] font-medium">
                {isOpening && pharmacy.operatingHours[today]
                  ? `${pharmacy.operatingHours[today].open} ~ ${pharmacy.operatingHours[today].close}`
                  : "영업종료"}
              </span>
            </div>

            {/* 전화번호 */}
            <div className="flex items-center gap-1.5 text-gray-700">
              <Phone size={14} className="text-gray-400 shrink-0" />
              {pharmacy.phone ? (
                <a
                  href={`tel:${pharmacy.phone}`}
                  className="text-[13px] font-medium hover:text-indigo-600 transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {pharmacy.phone}
                </a>
              ) : (
                <span className="text-[13px] font-medium text-gray-400">
                  번호 없음
                </span>
              )}
            </div>
            {/* 지도 */}
            <div className="hidden md:flex flex-col flex-1 mt-1">
              <div className="flex-1 min-h-[160px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                <StaticMap
                  center={{ lat: pharmacy.lat, lng: pharmacy.lng }}
                  // 지도의 스타일 height를 100%로 주어 부모 컨테이너를 꽉 채웁니다.
                  style={{ width: "100%", height: "100%" }}
                  marker={[
                    { position: { lat: pharmacy.lat, lng: pharmacy.lng } },
                  ]}
                  level={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2-2. 오른쪽 영역: 상세 운영시간  */}
        <div className="w-full md:w-60 shrink-0">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 h-full">
            {/* 모바일에서 상세운영시간 토글 */}
            <button
              onClick={() => setIsExpended(!isExpanded)}
              className="w-full flex items-center justify-between px-2 py-1 "
            >
              <div className="flex items-center gap-1.5 md:mt-2">
                <Clock size={12} className="text-gray-600" />
                <h4 className="text-[12px] font-medium text-gray-600">
                  상세 운영시간
                </h4>
              </div>

              {/* 웹에서는 토글 없음 */}
              <div className="md:hidden">
                {isExpanded ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </div>
            </button>
            <div className={`${isExpanded ? "block" : "hidden"} md:block px-3`}>
              <div className="border-t border-gray-200  mt-2 md:mt-0 mb-3  opacity-60" />
              <ul className="flex flex-col gap-2 pb-0 mt-5 border-gray-200  ">
                {operatingHours.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-[11px]  "
                  >
                    <span className="text-gray-500 ">{item.day}</span>
                    <span className="text-gray-900 font-semibold">
                      <span className="text-gray-900 font-semibold">
                        {item.time}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 3. 메모 입력 */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 group focus-within:border-indigo-200 focus-within:bg-white transition-all">
        <Pencil
          size={14}
          className="text-gray-400 group-focus-within:text-indigo-500"
        />
        <input
          type="text"
          placeholder="메모를 입력하세요"
          className="bg-transparent border-none outline-none text-[13px] w-full text-gray-600 placeholder:text-gray-400"
        />
      </div>

      {/* 4. 카카오맵 길찾기(모바일) */}
      <div className="md:hidden ">
        <button
          onClick={handleDirections}
          className="w-full flex items-center justify-center gap-2 bg-[#FAE100] hover:bg-[#F7E600] text-[#3c1e1e] font-bold py-3 rounded-xl text-sm transition-colors"
        >
          <Navigation size={16} />
          카카오맵 길찾기
        </button>
      </div>
    </div>
  );
}

export default PharmacyFavoriteCard;
