// 빈 상태 안내 컴포넌트
function EmptyState({ message = "데이터가 없습니다." }) {
  return (
    <div style={styles.container}>
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  message: {
    fontSize: 14,
    color: "#999",
  },
};

export default EmptyState;
