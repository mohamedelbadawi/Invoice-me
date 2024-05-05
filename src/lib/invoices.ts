import axios from "axios";
export const getInvoices = async (
  limit?: number,
  page: number = 1,
  search: string = ""
) => {
  const res = await axios.get(
    `/api/invoice?search=${search}&limit=${limit}&page=${page}`
  );
  return res;
};

export const getAnalytics = async () => {
  const res = await axios.get(`/api/dashboard`);
  return res;
};
