import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { productSchema } from "@/app/validators/Invoice";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addDaysToDate = (initialDate: string, daysToAdd: string) => {
  const newDate = new Date(initialDate);
  newDate.setDate(newDate.getDate() + parseInt(daysToAdd));
  return format(newDate, "dd/MM/yyyy");
};
type products = {
  name: string;
  totalPrice: number;
  price: number;
  quantity: number;
};
export const getSubTotal = (products: products[]) => {
  let subTotal: number = 0;
  products.map((product) => (subTotal += product.totalPrice));
  return subTotal;
};

export const getSearchParams = (requestUrl: string) => {
  const url = new URL(requestUrl);
  const searchParams = new URLSearchParams(url.search);
  return searchParams;
};

const currentDate = new Date();
export const getCurrentMonth = () => {
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  return {
    startOfMonth,
    endOfMonth,
  };
};
export const getTheLastMonth = () => {
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );
  return {
    startOfMonth,
    endOfMonth,
  };
};
