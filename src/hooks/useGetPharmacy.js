import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { mapPharmacyFromApi } from "../services/pharmacy/pharmacyMapper";

const fetchGetPharmacy = async () => {
  const response = await axios.get("/api/safetydata/DSSP-IF-00155", {
    params: {
      pageNo: 1,
      numOfRows: 10,
      returnType: "json",
    },
  });

  const pharmacyList = response.data?.body;

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
