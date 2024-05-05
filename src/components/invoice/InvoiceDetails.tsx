import { invoiceSchema } from '@/app/validators/Invoice'
import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { addDaysToDate } from '@/lib/utils'

type Props = {
    form: UseFormReturn<z.infer<typeof invoiceSchema>>
}
const InvoiceDetails = ({ form }: Props) => {
    return (
        <div className="p-9">
            <div className="flex w-full">
                <div className="grid grid-cols-4 gap-12">
                    <div className="text-sm font-light text-slate-500">
                        <div className='flex gap-2'>
                            <p className="text-sm font-normal text-slate-700">
                                Invoice Detail:
                            </p>
                            <Popover>
                                <PopoverTrigger className='bg-green-500 rounded-full text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </PopoverTrigger>
                                <PopoverContent> <InvoiceDetail form={form} /></PopoverContent>
                            </Popover>
                        </div>

                        <p>{form.getValues('companyName')}</p>
                        <p>{form.getValues('companyAddress')}</p>
                        <p>{form.getValues('companyCity')}</p>
                        <p>{form.getValues('companyZipCode')}</p>

                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <div className='flex gap-2'>
                            <p className="text-sm font-normal text-slate-700">Billed To</p>
                            <Popover>
                                <PopoverTrigger className='bg-green-500 rounded-full text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </PopoverTrigger>
                                <PopoverContent> <BilledToForm form={form} /></PopoverContent>
                            </Popover>
                        </div>
                        <p>{form.getValues('billedCompanyName')}</p>
                        <p>{form.getValues('billedCompanyAddress')}</p>
                        <p>{form.getValues('billedCompanyCity')}</p>
                        <p>{form.getValues('billedCompanyZipCode')}</p>

                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <div className='flex gap-2'>
                            <p className="text-sm font-normal text-slate-700">Invoice Number</p>
                            <Popover>
                                <PopoverTrigger className='bg-green-500 rounded-full text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </PopoverTrigger>
                                <PopoverContent> <InvoiceNumberAndDate form={form} /></PopoverContent>
                            </Popover>
                        </div>

                        <p>{form.getValues('invoiceNumber')}</p>

                        <div className='flex gap-2'>

                            <p className="mt-2 text-sm font-normal text-slate-700">
                                Date of Issue
                            </p>

                        </div>
                        <p>{form.getValues('billDate')}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <div className='flex gap-2'>

                            <p className="text-sm font-normal text-slate-700">Terms</p>
                            <Popover>
                                <PopoverTrigger className='bg-green-500 rounded-full text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </PopoverTrigger>
                                <PopoverContent> <Terms form={form} /></PopoverContent>
                            </Popover>
                        </div>
                        <p>{form.getValues('terms')} Days</p>

                        <p className="mt-2 text-sm font-normal text-slate-700">Due</p>
                        <p>{form.getValues('dueDate')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default InvoiceDetails





type invoiceProps = {
    form: UseFormReturn<z.infer<typeof invoiceSchema>>
}

function InvoiceDetail({ form }: invoiceProps) {
    return (

        <div>
            <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Company address</FormLabel>
                        <FormControl>
                            <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="companyCity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Company City</FormLabel>
                        <FormControl>
                            <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="companyZipCode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Company Zip code</FormLabel>
                        <FormControl>
                            <Input placeholder="zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}





function BilledToForm({ form }: invoiceProps) {
    return (
        <div>
            <FormField
                control={form.control}
                name="billedCompanyName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel> Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="billedCompanyAddress"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel> Company Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="billedCompanyCity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Company City</FormLabel>
                        <FormControl>
                            <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="billedCompanyZipCode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Company Zip code</FormLabel>
                        <FormControl>
                            <Input placeholder="zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}

function InvoiceNumberAndDate({ form }: invoiceProps) {
    return (
        <div>
            <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel> Invoice number</FormLabel>
                        <FormControl>
                            <Input placeholder="Invoice number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="billDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel> Invoice Date</FormLabel>
                        <FormControl>
                            <Input placeholder="Invoice date" type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}




function Terms({ form }: invoiceProps) {
    const termsWatch = form.watch('terms');
    useEffect(() => {
        if (parseInt(form.getValues('terms')) >= 0) {

            form.setValue("dueDate", addDaysToDate(form.getValues('billDate'), form.getValues('terms')))
        }
    }, [termsWatch, form])
    return (
        <div>    <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
                <FormItem>
                    <FormLabel> Invoice number</FormLabel>
                    <FormControl>
                        <Input placeholder="Invoice number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        /></div>
    )
}