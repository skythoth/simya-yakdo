import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { mapPharmacyFromApi } from "../services/pharmacy/pharmacyMapper";

const API_BASE_URL = "/api/pharmacy";

const fetchGetPharmacy = async () => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      pageNo: 1,
      numOfRows: 30000,
      _type: "json",
    },
  });

  const pharmacyList = response.data?.response?.body?.items?.item;

  if (!Array.isArray(pharmacyList)) {
    return [];
  }

  return pharmacyList.map(mapPharmacyFromApi);
};

export const useGetPharmacyQuery = () => {
  return useQuery({
    queryKey: ["getPharmacy"],
    queryFn: fetchGetPharmacy,
    retry: false,
  });
};
