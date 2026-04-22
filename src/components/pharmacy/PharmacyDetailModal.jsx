// 약국 상세 모달 - 약국 세부정보 + 길찾기 연동
function PharmacyDetailModal({ pharmacy, onClose }) {
  const handleDirections = () => {
    // TODO: 카카오맵 길찾기 URL로 이동
    console.log('길찾기:', pharmacy.name);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        <h2 style={styles.name}>{pharmacy.name}</h2>
        <p style={styles.info}>{pharmacy.address}</p>
        <p style={styles.info}>{pharmacy.phone || '전화번호 정보 없음'}</p>

        <div style={styles.hours}>
          <strong>영업시간</strong>
          {/* TODO: 요일별 영업시간 표시 */}
          <p style={styles.info}>영업시간 정보를 불러오는 중...</p>
        </div>

        <button style={styles.directionBtn} onClick={handleDirections}>
          길찾기
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 200,
  },
  modal: {
    position: 'relative',
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#fff',
    borderRadius: '16px 16px 0 0',
    padding: 24,
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 16,
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  hours: {
    marginTop: 16,
    marginBottom: 16,
  },
  directionBtn: {
    width: '100%',
    padding: 12,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
  },
};

export default PharmacyDetailModal;
