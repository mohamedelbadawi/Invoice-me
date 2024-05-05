"use client"
import { Button } from '@/components/ui/button';
import { Printer, Share } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
type Props = {}
import { useParams } from 'next/navigation'
import axios from 'axios';
import { InvoiceType, ProductType } from '@/app/validators/Invoice';
import Loading from '@/components/Loading';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


function Invoice(props: Props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const [invoice, setInvoice] = useState<InvoiceType | null>(null);
    const [error, setError] = useState<boolean>(false);

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    });
    useEffect(() => {
        const fetchInvoice = async () => {
            const id = params.id as string;
            if (!id) {
                console.log('No invoice ID provided');
                setError(true);
                return;
            }

            try {
                const response = await axios.get(`/api/invoice/${id}`);
                setInvoice(response.data.invoice);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        };

        if (params.id) {
            fetchInvoice();
        }
    }, [params.id]);

    if (error) {
        return <h3 className='font-semibold text-center mt-11'>Failed to load the invoice.</h3>;
    }

    if (!invoice) {
        return (<>
            <Loading />
        </>)

    }

    return (
        <div>
            <div className='flex justify-end mt-2'>
                <Button onClick={handlePrint} className='mx-5 mb-3 bg-red-500 gap-1'>  Print <Printer className='size-4' /> </Button>
                <ShareButton />
            </div>
            <section className="py-10 border " id='invoice' ref={contentRef} >
                <div className="max-w-5xl mx-auto py-16 bg-white border">
                    <article className="overflow-hidden">
                        <div className="bg-[white] rounded-b-md">
                            <div className="p-9">
                                <div className="space-y-6 text-slate-700">
                                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                                        {
                                            invoice?.companyName
                                        }

                                    </p>
                                </div>
                            </div>
                            <div className="p-9">
                                <div className="flex w-full">
                                    <div className="grid grid-cols-4 gap-12">
                                        <div className="text-sm font-light text-slate-500">
                                            <p className="text-sm font-normal text-slate-700">
                                                Invoice Detail:
                                            </p>
                                            <p>{invoice.companyName}</p>
                                            <p>{invoice.companyAddress}</p>
                                            <p>{invoice.companyCity}</p>
                                            <p>{invoice.companyZipCode}</p>
                                        </div>
                                        <div className="text-sm font-light text-slate-500">
                                            <p className="text-sm font-normal text-slate-700">Billed To</p>
                                            <p>{invoice.billedCompanyName}</p>
                                            <p>{invoice.billedCompanyAddress}</p>
                                            <p>{invoice.billedCompanyCity}</p>
                                            <p>{invoice.billedCompanyZipCode}</p>
                                        </div>
                                        <div className="text-sm font-light text-slate-500">
                                            <p className="text-sm font-normal text-slate-700">Invoice Number</p>
                                            <p>{invoice.invoiceNumber}</p>

                                            <p className="mt-2 text-sm font-normal text-slate-700">
                                                Date of Issue
                                            </p>
                                            <p>{invoice.billDate}</p>
                                        </div>
                                        <div className="text-sm font-light text-slate-500">
                                            <p className="text-sm font-normal text-slate-700">Terms</p>
                                            <p>{invoice.terms}</p>

                                            <p className="mt-2 text-sm font-normal text-slate-700">Due</p>
                                            <p>{invoice.dueDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-9" >
                                <div className="flex flex-col mx-0 mt-8">
                                    <table className="min-w-full divide-y divide-slate-500">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                                                    Description
                                                </th>
                                                <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                                                    Rate
                                                </th>
                                                <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                invoice.Product.map((product: ProductType, index) => {
                                                    return (
                                                        <tr className="border-b border-slate-200" key={index}>
                                                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                                                <div className="font-medium text-slate-700">{product.name}</div>
                                                                <div className="mt-0.5 text-slate-500 sm:hidden">
                                                                    1 unit at $0.00
                                                                </div>
                                                            </td>
                                                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                                {product.quantity}
                                                            </td>
                                                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                                ${product.price}
                                                            </td>
                                                            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                ${product.totalPrice}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }



                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th scope="row" colSpan={3} className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                    Subtotal
                                                </th>
                                                <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                                                    Subtotal
                                                </th>
                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                    $
                                                    {invoice.subTotal}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colSpan={3} className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                    Discount
                                                </th>
                                                <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                                                    Discount
                                                </th>
                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0 text-red-500 font-bold">
                                                    <span className=''>-</span>${invoice.discount}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colSpan={3} className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                                                    Total
                                                </th>
                                                <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
                                                    Total
                                                </th>
                                                <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                                    ${invoice.total}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </article>
                </div>
            </section>
        </div>

    )
}

export default Invoice




const ShareButton = (props: Props) => {
    const copyToClipboard = async () => {
        try {
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    return (
        <Popover>
            <PopoverTrigger><Button className='mx-10 mb-3  gap-1' onClick={copyToClipboard}>  Share <Share className='size-4' /> </Button></PopoverTrigger>
            <PopoverContent>Invoice link Copied</PopoverContent>
        </Popover>
    )
}