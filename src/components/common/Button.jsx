// 공통 버튼 컴포넌트
function Button({ children, onClick, variant = 'default', disabled = false }) {
  const buttonStyle = {
    ...styles.base,
    ...(variant === 'primary' ? styles.primary : styles.default),
    ...(disabled ? styles.disabled : {}),
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

const styles = {
  base: {
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 14,
    cursor: 'pointer',
    border: 'none',
  },
  default: {
    backgroundColor: '#e0e0e0',
    color: '#333',
  },
  primary: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default Button;
