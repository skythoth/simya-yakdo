import React from "react";

function FilterButton({ label, icon: Icon, active, onClick, activeColor }) {
  // 색상 정의
  const themeStyles = {
    indigo: {
      hover: "hover:bg-sky-50 hover:border-sky-200",
      active: "bg-sky-500 border-sky-500 text-white",
      iconActive: "text-white fill-white/20",
      iconInactive: "text-sky-500",
    },
    purple: {
      hover: "hover:bg-purple-50 hover:border-purple-200",
      active: "bg-purple-500 border-purple-500 text-white",
      iconActive: "text-white fill-white/20",
      iconInactive: "text-purple-500",
    },
    rose: {
      hover: "hover:bg-rose-50 hover:border-rose-200",
      active: "bg-rose-500 border-rose-500 text-white",
      iconActive: "text-white fill-white/20",
      iconInactive: "text-rose-500",
    },
  };

  const currentTheme = themeStyles[activeColor] || themeStyles.indigo;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
        border shadow-sm pointer-events-auto hover:shadow-md hover:-translate-y-0.5
        gap-1 md:gap-2 px-2.5 py-1 md:px-4 md:py-2 rounded-full
        ${
          active
            ? `${currentTheme.active} shadow-sky-200`
            : `bg-white border-gray-200 text-gray-800 ${currentTheme.hover}`
        }
      `}
    >
      {/* 아이콘 */}
      {Icon && (
        <Icon
          size={window.innerWidth < 768 ? 14 : 16}
          className={`transition-colors ${
            active ? currentTheme.iconActive : currentTheme.iconInactive
          }`}
        />
      )}

      {/* 글자 */}
      <span className="text-[11px] md:text-[13px] font-bold whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

export default FilterButton;
