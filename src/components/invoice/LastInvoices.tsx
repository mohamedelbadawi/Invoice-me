"use client"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { InvoiceType } from "@/app/validators/Invoice"
import { getInvoices } from "@/lib/invoices"

function LastInvoices() {
    const [invoices, setInvoices] = useState<InvoiceType[] | null>([]);
    useEffect(() => {
        async function fetchInvoices(limit?: number) {
            const res = await getInvoices(limit);
            setInvoices(res.data.invoices);

        }
        fetchInvoices(5)
    }, [])
    return (


        <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Invoices</CardTitle>
                    <CardDescription>
                        Recent 5 Invoices.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/invoice">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice number</TableHead>
                                <TableHead className="hidden sm:table-cell">Company name</TableHead>
                                <TableHead className="hidden md:table-cell">Billed Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {invoices && invoices.length > 0 ? invoices.map((invoice, index) => (
                                <TableRow key={index}>
                                    <TableCell>{invoice.invoiceNumber}</TableCell>
                                    <TableCell className="hidden xl:table-cell">{invoice.companyName}</TableCell>
                                    <TableCell className="hidden xl:table-cell">{invoice.billDate}</TableCell>
                                    <TableCell className="text-right">${invoice.total}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No invoices yet</TableCell>
                                </TableRow>
                            )}


                        </TableBody>
                    </Table>
                </div>

            </CardContent>
        </Card>

    )
}
export default LastInvoices;