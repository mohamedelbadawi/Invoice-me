import { getInvoiceSchema } from "@/app/validators/Invoice";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = getInvoiceSchema.safeParse({ id: params.id });
    if (!res.success) {
      const { error } = res;
      return NextResponse.json(
        { error: error },
        {
          status: 400,
        }
      );
    }
    const invoice = await db.invoice.findFirst({
      where: { id: params.id },
      include: {
        Product: {},
      },
    });
    if (!invoice) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ invoice: invoice }, { status: 200 });
  } catch (error: any) {
    console.log("error", error);

    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 400,
      }
    );
  }
}
