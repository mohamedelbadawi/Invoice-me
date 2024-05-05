import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createProducts = async function (
  products: Prisma.ProductCreateManyInput[],
  invoiceId: string
) {
  const productsToCreate: Prisma.ProductCreateManyInput[] = products.map(
    (product) => ({
      ...product,
      invoiceId, // Ensure this field is expected in the Product model
    })
  );
  return db.product.createMany({ data: productsToCreate });
};
