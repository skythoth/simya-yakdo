// 로딩 스피너 컴포넌트
function Loading({ message = '불러오는 중...' }) {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  spinner: {
    width: 32,
    height: 32,
    border: '3px solid #e0e0e0',
    borderTop: '3px solid #1a1a2e',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
};

export default Loading;
