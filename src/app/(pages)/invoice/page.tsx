"use client"
import React, { Suspense, useEffect, useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Plus, View } from "lucide-react"


import {

    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { InvoiceType } from "@/app/validators/Invoice"
import { getInvoices } from "@/lib/invoices"
import Link from "next/link"
import Loading from "../Loading"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

const Table = React.lazy(() => import('@/components/ui/table').then(module => ({ default: module.Table })));

const Button = React.lazy(() => import('@/components/ui/button').then(module => ({ default: module.Button })));;
const Input = React.lazy(() => import('@/components/ui/input').then(module => ({ default: module.Input })));;

const columns: ColumnDef<InvoiceType>[] = [

    { accessorKey: 'id', header: 'id' },
    { accessorKey: 'billedCompanyName', header: 'Billed Company Name' },
    { accessorKey: 'billedCompanyAddress', header: 'Billed Address' },
    { accessorKey: 'billedCompanyCity', header: 'Billed City' },
    { accessorKey: 'billedCompanyZipCode', header: 'Billed Zip Code' },
    { accessorKey: 'invoiceNumber', header: 'Invoice Number' },
    { accessorKey: 'billDate', header: 'Bill Date' },
    { accessorKey: 'dueDate', header: 'Due Date' },
    { accessorKey: 'total', header: 'Total' },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const invoice = row.original

            return (
                <><Button asChild>
                    <Link href={`invoice/${invoice.id}`}>
                        <View className="w-4 h-4 me-2" /> view
                    </Link>
                </Button></>
            )
        },
    },

];
type Props = {}
export default function Invoices(props:Props) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            return redirect('/')
        }
    }, [status, session])
    const [data, setData] = useState<InvoiceType[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchWord, setSearchWord] = useState<string>('');
    useEffect(() => {
        async function fetchInvoices() {
            const res = await getInvoices(10, currentPage, searchWord)
            setData(res.data.invoices)
            setTotalPages(res.data.totalPages)
        }
        fetchInvoices()
    }, [currentPage, searchWord])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full ">
            <Suspense fallback={<Loading />}>

                <div className="flex items-center justify-between py-4 gap-2 mt-2">
                    <Input
                        placeholder="search for company names..."
                        value={searchWord}
                        onChange={(event) =>
                            setSearchWord(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Button asChild>

                        <Link href={'/invoice/create'} className=" rounded-full p-2"><Plus /> create invoice</Link>
                    </Button>
                </div>
                <div className="rounded-md border">
                    <Table className="rounded-lg">
                        <TableHeader className="bg-black ">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="text-white">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        page {currentPage} of{" "}
                        {totalPages} Pages
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-black text-white"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-black text-white"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </Suspense>

        </div >
    )
}
