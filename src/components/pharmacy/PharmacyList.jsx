// 약국 리스트 - 약국 카드 목록 렌더링
import PharmacyCard from './PharmacyCard';
import EmptyState from '../common/EmptyState';

function PharmacyList({ pharmacies, onSelect }) {
  if (!pharmacies || pharmacies.length === 0) {
    return <EmptyState message="주변 약국 정보가 없습니다." />;
  }

  return (
    <div style={styles.list}>
      {pharmacies.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy.id}
          pharmacy={pharmacy}
          onClick={() => onSelect(pharmacy)}
        />
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
  },
};

export default PharmacyList;
