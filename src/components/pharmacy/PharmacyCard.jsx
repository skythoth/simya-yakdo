// 약국 카드 - 리스트에서 사용하는 개별 약국 요약 카드
import Chip from '../common/Chip';

function PharmacyCard({ pharmacy, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.top}>
        <strong>{pharmacy.name}</strong>
        <Chip label={pharmacy.statusLabel || '확인 필요'} />
      </div>
      <p style={styles.address}>{pharmacy.address}</p>
      <p style={styles.distance}>
        {pharmacy.distance ? `${pharmacy.distance}m` : '거리 정보 없음'}
      </p>
    </div>
  );
}

const styles = {
  card: {
    padding: 12,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    cursor: 'pointer',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: '#666',
  },
  distance: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
};

export default PharmacyCard;
