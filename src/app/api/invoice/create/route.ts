import { invoiceSchema } from "@/app/validators/Invoice";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { createInvoice } from "../../services/invoice.services";
import { createProducts } from "../../services/product.services";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { Product, ...rest } = body;

    const invoice = await createInvoice(rest);

    await createProducts(Product, invoice.id);

    return new NextResponse(
      JSON.stringify({
        message: "Invoice created successfully",
        id: invoice.id,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Failed to create invoice or products:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
