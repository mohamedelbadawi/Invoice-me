"use client"
import { invoiceSchema } from '@/app/validators/Invoice';
import AddAndEditProduct from '@/components/invoice/AddProduct';
import CompanyData from '@/components/invoice/CompanyData';
import InvoiceDetails from '@/components/invoice/InvoiceDetails';
import Products from '@/components/invoice/Products';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getSubTotal } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
type Props = {}

function Invoice(props:Props) {
    
    const { data: session, status } = useSession();
    const router = useRouter();
    const form = useForm<z.infer<typeof invoiceSchema>>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            companyName: "Company Name",
            companyImage: undefined,
            companyAddress: 'Fake Street 123',
            companyCity: 'San Javier',
            companyZipCode: 'CA 1234',
            billedCompanyName: 'The Boring Company',
            billedCompanyAddress: 'Tesla Street 007',
            billedCompanyCity: 'Frisco',
            billedCompanyZipCode: 'CA 0000',
            invoiceNumber: '2288787878',
            billDate: '10/10/2022',
            terms: '14',
            dueDate: '24/10/2022',
            Product: [
                { name: "example", quantity: 1, price: 10, totalPrice: 10 },
            ],
            subTotal: 10,
            discount: 0,
            tax: 0,
            total: 10
        },
    })
    form.watch();

    async function onSubmit(values: z.infer<typeof invoiceSchema>) {
        try {
            const response = await axios.post('/api/invoice/create', { ...values, userId: session?.user.id });
            if (response.status === 201) {
                toast.success(response.data.message);
                router.push(`/${response.data.id}`)

            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            console.error('Registration failed:', error);
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        if (status === 'unauthenticated') {
            return redirect('/')
        }
    }, [status, session])
    return (
        <div>
            <Form {...form}>
                <form className="space-y-8" >
                    <div className='flex justify-end mt-4'>
                        <Button className='mx-10 mb-3' onClick={form.handleSubmit(onSubmit)} type='submit'>Save </Button>
                    </div>
                    <section className="py-10 border " id='invoice' >
                        <div className="max-w-5xl mx-auto py-16 bg-white border">
                            <article className="overflow-hidden">
                                <div className="bg-[white] rounded-b-md">
                                    <CompanyData form={form} />
                                    <InvoiceDetails form={form} />

                                    <div className="p-9" >
                                        <AddAndEditProduct form={form} />
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
                                                <Products form={form} />
                                                <tfoot>
                                                    <tr>
                                                        <th scope="row" colSpan={3} className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                            Subtotal
                                                        </th>
                                                        <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                                                            Subtotal
                                                        </th>
                                                        <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                            ${form.getValues('subTotal')}
                                                        </td>
                                                    </tr>

                                                    <Discount form={form} />
                                                    <tr>
                                                        <th scope="row" colSpan={3} className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                                                            Total
                                                        </th>
                                                        <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
                                                            Total
                                                        </th>
                                                        <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                                            ${form.getValues('total')}
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
                </form>
            </Form>

        </div>

    )
}

export default Invoice


type DiscountProps = {
    form: UseFormReturn<z.infer<typeof invoiceSchema>>
}
function Discount({ form }: DiscountProps) {
    const products = form.getValues('Product')
    const subTotal = getSubTotal(products)
    const applyDiscount = () => {
        if (!(form.getValues('discount') > subTotal))
            form.setValue('total', getSubTotal(products) - form.getValues('discount'))

    }
    return (
        <tr>
            <th scope="row" colSpan={3} className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                Discount
            </th>
            <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                Discount
            </th>
            <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0 ">
                <p className=''>
                    ${form.getValues('discount')}
                    <Popover>
                        <PopoverTrigger className='bg-green-500 rounded-full text-white m-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </PopoverTrigger>
                        <PopoverContent>
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount</FormLabel>
                                        <FormControl>
                                            <Input placeholder="discount" {...field}

                                                onChange={(e) => {
                                                    const discountValue = parseFloat(e.target.value)
                                                    if (discountValue >= 1) {
                                                        form.setValue("discount", discountValue);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                            <Button className='mt-2 ' onClick={applyDiscount} >Apply</Button>
                        </PopoverContent>
                    </Popover>
                </p>
            </td>
        </tr >


    )
}