// 라우트 정의
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FavoritesPage from "../pages/FavoritesPage";
import AppLayout from "../components/layout/AppLayout";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="pharmacy/:id" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>

      {/* TODO: 추후 확장용 라우트 (예: /emergency) */}

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default AppRouter;
