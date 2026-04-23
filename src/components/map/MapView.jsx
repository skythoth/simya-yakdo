// 카카오맵 래퍼 컴포넌트
// TODO: react-kakao-maps-sdk 연동

function MapView({ pharmacies, onMarkerClick }) {
  // TODO: 카카오맵 렌더링
  // TODO: pharmacies 기반 마커 표시
  // TODO: 마커 클릭 시 onMarkerClick 호출

  return (
    <div style={styles.container}>
      <div style={styles.placeholder}>
        <p>지도 영역</p>
        <p style={{ fontSize: 12, color: "#999" }}>
          카카오맵이 여기에 표시됩니다 (약국 {pharmacies.length}개)
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: 300,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8e8e8",
    border: "1px solid #ccc",
  },
};

export default MapView;
