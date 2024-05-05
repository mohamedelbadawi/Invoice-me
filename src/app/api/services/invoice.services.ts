import { db } from "@/lib/db";
import { getCurrentMonth, getTheLastMonth } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export const createInvoice = async function (
  data: Prisma.InvoiceUncheckedCreateInput
) {
  return db.invoice.create({ data });
};

export const getThisMonthInvoicesCount = async function () {
  const thisMonth = getCurrentMonth();
  const thisMonthInvoices = await db.invoice.count({
    where: {
      createdAt: {
        gte: thisMonth.startOfMonth,
        lte: thisMonth.endOfMonth,
      },
    },
  });
  return thisMonthInvoices;
};
export const getTheLastMonthInvoicesCount = async function () {
  const lastMonth = getTheLastMonth();
  const theLastMonthInvoices = await db.invoice.count({
    where: {
      createdAt: {
        gte: lastMonth.startOfMonth,
        lte: lastMonth.endOfMonth,
      },
    },
  });
  return theLastMonthInvoices;
};
