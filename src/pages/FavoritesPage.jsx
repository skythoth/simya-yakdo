// 즐겨찾기 페이지 - 저장한 약국 목록 표시
import PharmacyList from '../components/pharmacy/PharmacyList';
import EmptyState from '../components/common/EmptyState';

function FavoritesPage() {
  // TODO: usePharmacyStore에서 즐겨찾기 목록 가져오기
  const favorites = [];

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <h2>즐겨찾기</h2>
        <EmptyState message="저장한 약국이 없습니다." />
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2>즐겨찾기</h2>
      <PharmacyList pharmacies={favorites} onSelect={() => { /* TODO */ }} />
    </div>
  );
}

export default FavoritesPage;
