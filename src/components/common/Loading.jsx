// 로딩 스피너 컴포넌트
function Loading({ message = '불러오는 중...' }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.spinner} />
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    position: 'relative',
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    zIndex: 100
  },
};

export default Loading;
