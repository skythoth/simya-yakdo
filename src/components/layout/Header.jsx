import { Link } from "react-router-dom";
import { Home, Heart } from "lucide-react";

function Header() {
  return (
    <nav className="flex sticky top-0 z-50 h-12 shrink-0 items-center justify-between px-4 md:px-8 py-2 border-b border-gray-700 bg-[#1a1a2e] text-white">
      {/* 왼쪽 로고 */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-7 h-7 md:w-8 md:h-8 object-contain"
          />
          <span className="font-bold text-lg md:text-xl tracking-tight">
            심야약도
          </span>
        </Link>
      </div>

      {/* 오른쪽 네비게이션 */}
      <div className="flex gap-4 md:gap-6 text-sm font-medium items-center">
        {/* 1. 웹: Home, 즐겨찾기 */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            HOME
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            to="/favorites"
            className="hover:text-blue-400 transition-colors"
          >
            즐겨찾기
          </Link>
        </div>

        {/* 2. 모바일: 아이콘 */}
        <Link
          to="/"
          className="md:hidden p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <Home className="w-5 h-5 text-gray-300" />
        </Link>
        <Link
          to="/favorites"
          className="md:hidden p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <Heart className="w-5 h-5 text-gray-300" />
        </Link>
      </div>
    </nav>
  );
}

export default Header;
