import { getAuth } from "@/lib/auth";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import {
  getTheLastMonthInvoicesCount,
  getThisMonthInvoicesCount,
} from "../services/invoice.services";

export async function GET(req: Request) {
  try {
    const session = await getAuth();
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json(
        { message: "you must be logged in" },
        { status: 401 }
      );
    }
    const totalInvoicesCount = await db.invoice.count();
    const thisMonthInvoicesCount = await getThisMonthInvoicesCount();
    const lastMonthInvoicesCount = await getTheLastMonthInvoicesCount();
    return NextResponse.json(
      { totalInvoicesCount, thisMonthInvoicesCount, lastMonthInvoicesCount },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server internal error" },
      { status: 400 }
    );
  }
}
