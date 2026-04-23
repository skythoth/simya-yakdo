import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "8ec773cd7bb4d3de1d92644359626af9",
    libraries: ["clusterer", "drawing", "services"],
  })
}