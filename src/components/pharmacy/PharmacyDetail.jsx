import React from "react";
import { X, Navigation } from "lucide-react";

// 약국 상세 모달 - 약국 세부정보 + 길찾기 연동
function PharmacyDetail({ pharmacy, onClose }) {
  //임시 시간정보
  const operatingHours = [
    { day: "월요일", time: "09:00 - 18:00" },
    { day: "화요일", time: "09:00 - 18:00" },
    { day: "수요일", time: "09:00 - 18:00" },
    { day: "목요일", time: "09:00 - 18:00" },
    { day: "금요일", time: "09:00 - 18:00" },
    { day: "토요일", time: "09:00 - 18:00" },
    { day: "일요일", time: "약국휴무" },
    { day: "공휴일", time: "약국휴뮤" },
  ];
  const handleDirections = () => {
    // TODO: 카카오맵 길찾기 URL로 이동
    console.log("길찾기:", pharmacy.name);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-md p-2  ">
      {/* 상세타이틀 & 닫기버튼 */}
      <div className="flex justify-between items-center px-2 border-b border-gray-200 ">
        <h3 className="text-sm font-bold text-gray-600">운영시간</h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={22} className="text-gray-400" />
        </button>
      </div>

      {/* 운영시간 리스트 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-3">
          {operatingHours.map((item, index) => (
            <li key={index} className="flex justify-between ">
              <span className="text-gray-600 font-medium text-[14px]">
                {item.day}
              </span>
              <span className="text-gray-900 font-semibold text-[12px]">
                {item.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* 안내내용 */}
      <p className="text-[12px] text-gray-400 m-2 text-center">
        정보가 실제와 다를 수 있으니 전화 후 방문해 주세요.
      </p>
      {/* 카카오맵 버튼 */}
      <div className="px-5 py-3 bg-white">
        <button
          onClick={handleDirections}
          className="w-full  shadow-sm bg-[#FAE100] hover:bg-[#F7E600] text-[#3c1e1e]  font-bold py-2.5 rounded-lg text-sm"
        >
          카카오맵 길찾기
        </button>
      </div>
    </div>
  );
}

export default PharmacyDetail;
