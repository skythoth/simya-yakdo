// 상단 헤더 - 서비스명 + 네비게이션
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "/logo.png";

function Header() {
  return (
    <nav className="flex sticky top-0 z-50 h-12 items-center justify-between px-8 py-2 border-b border-gray-700 bg-[#1a1a2e] text-white">
      {/* 왼쪽: 로고 영역 */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity "
        >
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain " />
          <span className="font-bold text-xl tracking-tight">심야약도</span>
        </Link>
      </div>

      {/* 오른쪽: 네비게이션 영역 */}
      <div className="flex gap-6 text-sm font-medium items-center">
        <Link to="/" className="hover:text-blue-400 transition-colors">
          HOME
        </Link>
        <span className="text-gray-600">|</span>
        <Link to="/favorites" className="hover:text-blue-400 transition-colors">
          즐겨찾기
        </Link>

        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <Search className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </nav>
  );
}
export default Header;
