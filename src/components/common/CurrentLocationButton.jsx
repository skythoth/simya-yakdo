import React, { useState } from "react";
import { LocateFixed } from "lucide-react";

const CurrentLocationButton = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = async () => {
    if (typeof onClick !== "function") return;
    setIsActive(true);
    await onClick();
    setTimeout(() => setIsActive(false), 800);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute bottom-3 right-4 z-[50] p-2 rounded-full shadow-md 
      transition-all duration-300 pointer-events-auto border-2
      active:scale-90 md:bottom-10 md:right-10 md:p-3
      ${
        isActive
          ? "bg-sky-500 border-sky-500 shadow-sky-200"
          : "bg-white border-gray-300 hover:border-sky-500 hover:bg-sky-50"
      }`}
    >
      <LocateFixed
        className={`w-4 h-4 transition-colors duration-300 md:w-5 md:h-5 ${
          isActive ? "text-white" : "text-gray-500"
        }`}
      />
    </button>
  );
};

export default CurrentLocationButton;
