"use client"
import { invoiceSchema } from '@/app/validators/Invoice'
import React, { useEffect } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { productSchema } from '../../app/validators/Invoice';

type Props = {
    form: UseFormReturn<z.infer<typeof invoiceSchema>>
}

function Products({ form }: Props) {
    const products = form.getValues('Product');

    return (
        <tbody>
            {
                products.map((product: { name: string, quantity: number, price: number, totalPrice: number }, index) => {
                    return (
                        <tr className="border-b border-slate-200" key={index}>
                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                <div className="font-medium text-slate-700">{product.name}</div>

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

    )
}

export default Products