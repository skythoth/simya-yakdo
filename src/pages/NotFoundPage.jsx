import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-48px)] p-6 text-center">
      {/* 404 오류*/}
      <h1 className="text-8xl font-black text-gray-200 mb-4">404</h1>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        페이지를 찾을 수 없습니다.
      </h2>

      <p className="text-gray-500 mb-8">
        입력하신 주소가 잘못되었거나 <br />
        사라진 페이지입니다.
      </p>

      {/* 홈버튼*/}
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-950 transition-all shadow-md"
      >
        <Home size={18} />
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
