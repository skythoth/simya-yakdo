import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "/api/holiday";

const fetchGetHoliday = async () => {
  const today = new Date();
  const solYear = String(today.getFullYear());
  const solMonth = String(today.getMonth() + 1).padStart(2, "0");
  const todayDate = Number(
    `${solYear}${solMonth}${String(today.getDate()).padStart(2, "0")}`,
  );

  const response = await axios.get(API_BASE_URL, {
    params: {
      pageNo: 1,
      numOfRows: 100,
      solYear,
      solMonth,
      _type: "json",
    },
  });

  const holidayItems = response.data?.response?.body?.items?.item;
  const holidayList = Array.isArray(holidayItems)
    ? holidayItems
    : holidayItems
      ? [holidayItems]
      : [];

  return holidayList.some((holiday) => Number(holiday?.locdate) === todayDate);
};

export const useGetHolidayQuery = () => {
  return useQuery({
    queryKey: ["getHoliday"],
    queryFn: fetchGetHoliday,
    retry: false,
  });
};
