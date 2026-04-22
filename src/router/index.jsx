// 라우트 정의
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FavoritesPage from '../pages/FavoritesPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      {/* TODO: 추후 확장용 라우트 (예: /emergency) */}
    </Routes>
  );
}

export default AppRouter;
