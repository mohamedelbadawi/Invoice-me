import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from '../ui/label'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { invoiceSchema } from '@/app/validators/Invoice'
type Props = {
    form: UseFormReturn<z.infer<typeof invoiceSchema>>
}

const CompanyData = ({ form }: Props) => {


    return (
        <div className="p-9">
            <div className="space-y-6 text-slate-700">


                <div className='flex gap-4'>

                    <p className="text-xl font-extrabold tracking-tight uppercase font-body ">
                        {form.getValues('companyName')}

                    </p>
                    <Popover>
                        <PopoverTrigger className='bg-green-500 rounded-full text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </PopoverTrigger>
                        <PopoverContent><CompanyNamePopover form={form} /></PopoverContent>
                    </Popover>
                </div>
            </div>

        </div>
    )
}

const CompanyNamePopover = ({ form }: Props) => {
    return (
        <div>
            <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>

    )

}

type companyLogoProps = {
    form: UseFormReturn<z.infer<typeof invoiceSchema>>,

}
const CompanyLogoPopover = ({ form }: companyLogoProps) => {
    console.log(form.getValues('companyImage'))
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        console.log(selectedImage)
        console.log('hello')
        form.setValue('companyImage', selectedImage)
    }
    return (
        <div>
            <FormField
                control={form.control}
                name="companyImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <Input placeholder="Image" type='file'  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}
export default CompanyData