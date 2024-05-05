import { z } from "zod";
// import { ObjectId } from "mongodb";
export const productSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  totalPrice: z.number(),
});

export const invoiceSchema = z.object({
  companyName: z.string(),
  companyImage: z.any(),
  companyAddress: z.string(),
  companyCity: z.string(),
  companyZipCode: z.string(),
  billedCompanyAddress: z.string(),
  billedCompanyCity: z.string(),
  billedCompanyZipCode: z.string(),
  billedCompanyName: z.string(),
  invoiceNumber: z.string(),
  billDate: z.string(),
  terms: z.string(),
  dueDate: z.string(),
  Product: z.array(productSchema),
  subTotal: z.number(),
  total: z.number(),
  discount: z.number(),
  tax: z.number(),
  companyLogo: z.string().optional(),
  id: z.string().optional(),
});

export const getInvoiceSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Id"),
});

export type InvoiceType = z.infer<typeof invoiceSchema>;
export type ProductType = z.infer<typeof productSchema>;
