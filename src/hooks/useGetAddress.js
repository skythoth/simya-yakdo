import { useQuery } from "@tanstack/react-query";

const waitForKakaoServices = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const checkServices = () => {
      if (window.kakao?.maps?.services) {
        resolve(window.kakao.maps.services);
        return;
      }

      attempts += 1;

      if (attempts >= 20) {
        reject(new Error("Kakao map services is not loaded."));
        return;
      }

      setTimeout(checkServices, 250);
    };

    checkServices();
  });
};

const fetchGetAddress = async (query) => {
  const services = await waitForKakaoServices();

  return new Promise((resolve, reject) => {
    const geocoder = new services.Geocoder();

    geocoder.addressSearch(query, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result[0] ?? null);
        return;
      }

      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        resolve(null);
        return;
      }

      reject(new Error(`Address search failed: ${status}`));
    });
  });
};

export const useGetAddressQuery = (query) => {
  return useQuery({
    queryKey: ["getAddress", query],
    queryFn: () => fetchGetAddress(query),
    enabled: Boolean(query?.trim()),
    retry: false,
  });
};
