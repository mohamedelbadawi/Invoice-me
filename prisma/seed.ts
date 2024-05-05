// import { db } from "@/lib/db";

import { Prisma, PrismaClient } from "@prisma/client";
import { count } from "console";
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();
async function main() {
  // Generate fake invoice data
  for (let i = 0; i < 10; i++) {
    const invoiceData: Prisma.InvoiceUncheckedCreateInput = {
      companyName: faker.company.name(),
      companyAddress: faker.address.streetAddress(),
      companyCity: faker.address.city(),
      companyZipCode: faker.address.zipCode(),
      billedCompanyName: faker.company.name(),
      billedCompanyAddress: faker.address.streetAddress(),
      billedCompanyCity: faker.address.city(),
      billedCompanyZipCode: faker.address.zipCode(),
      invoiceNumber: faker.random.alphaNumeric(10), // Generate random alphanumeric invoice number
      billDate: faker.date.past().toISOString().substring(0, 10), // Random past date
      terms: String(faker.datatype.float({ min: 1, max: 2 })), // Random terms between 7 and 30 days
      dueDate: faker.date.future().toISOString().substring(0, 10), // Random future date
      userId: "6634ce93dae07fd32c2289da",
      subTotal: faker.datatype.float({ min: 2, max: 3 }),
      discount: faker.datatype.float({ min: 1, max: 2 }),
      tax: faker.datatype.float({ min: 0, max: 2 }),
      total: faker.datatype.float({ min: 2, max: 3 }),
      createdAt: faker.date.between({
        from: "2024-04-01T00:00:00.000Z",
        to: "2024-05-01T00:00:00.000Z",
        count: 1,
      }),
    };

    // Insert invoice data into the database
    const createdInvoice = await prisma.invoice.create({
      data: invoiceData,
    });
    
  }
  console.log("Invoice data inserted successfully:");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally();
