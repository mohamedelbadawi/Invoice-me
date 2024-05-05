// import { useSearchParams } from "next/navigation";
import { getAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSearchParams } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getAuth();
    if (!session?.user.id) {
      return NextResponse.json(
        { message: "You must be logged in" },
        { status: 400 }
      );
    }
    const params = getSearchParams(req.url as string);
    const limit = parseInt(params.get("limit") || "10");
    const page = parseInt(params.get("page") || "1");
    const searchQuery = params.get("search") || "";
    const skip = (page - 1) * limit || 0;
    const invoices = await db.invoice.findMany({
      where: {
        userId: session.user.id,
        billedCompanyName: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: skip,
    });
    const totalPages = await db.invoice.count({
      where: {
        userId: session.user.id,
        billedCompanyName: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({
      invoices: invoices,
      page: page,
      totalPages: Math.ceil(totalPages / limit),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Server internal error",
      },
      { status: 500 }
    );
  }
}
