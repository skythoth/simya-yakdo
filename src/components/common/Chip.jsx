// 칩 컴포넌트 - 필터 선택, 상태 태그 등에 사용
function Chip({ label, active = false, onClick }) {
  const chipStyle = {
    ...styles.base,
    ...(active ? styles.active : styles.inactive),
    ...(onClick ? { cursor: 'pointer' } : {}),
  };

  return (
    <span style={chipStyle} onClick={onClick}>
      {label}
    </span>
  );
}

const styles = {
  base: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  active: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  inactive: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
};

export default Chip;
