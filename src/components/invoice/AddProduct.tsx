import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { invoiceSchema, productSchema } from '@/app/validators/Invoice'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getSubTotal } from '@/lib/utils'
type Props = {
    form: UseFormReturn<z.infer<typeof invoiceSchema>>
}

const AddAndEditProduct = ({ form }: Props) => {
    const { fields, replace } = useFieldArray({ name: "Product", control: form.control });
    const updateTotalPrice = () => {
        const products = form.getValues('Product')
        const updatedProducts = products.map((product) => {
            return { ...product, totalPrice: product.quantity * product.price }
        })
        replace(updatedProducts)
        form.setValue('subTotal', getSubTotal(products))
    }
    return (
        <div className='flex justify-end gap-4'>
            <Popover>
                <PopoverTrigger className='bg-green-500 rounded-full text-white p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </PopoverTrigger>
                <PopoverContent className=' overflow-y-scroll'>
                    <AddProductForm form={form} />
                </PopoverContent>
            </Popover>

            <AlertDialog>
                <AlertDialogTrigger className='bg-red-500 rounded-full text-white text-sm p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit the products</AlertDialogTitle>
                        <AlertDialogDescription  >
                            <ProductsForm form={form} />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={updateTotalPrice}>Save</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </div>
    )
}

export default AddAndEditProduct
interface Product {
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

const AddProductForm = ({ form }: Props) => {
    const { append } = useFieldArray({ name: "Product", control: form.control });
    const productForm = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: 1,
            quantity: 1,
            totalPrice: 1
        }
    })

    async function onSubmit(values: z.infer<typeof productSchema>) {
        append({ name: values.name, price: values.price, quantity: values.quantity, totalPrice: values.quantity * values.price })
        const products = form.getValues('Product')
        form.setValue('subTotal', getSubTotal(products))
        form.setValue('total', getSubTotal(products) - form.getValues('discount'))

    }

    return (
        <div>
            <Form {...productForm} >
                <form className="space-y-8" onSubmit={productForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={productForm.control}
                        name={`name`}
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

                    <FormField
                        control={productForm.control}
                        name={`price`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>price</FormLabel>
                                <FormControl>
                                    <Input  {...field}
                                        placeholder="price" min={1} type='number'
                                        onChange={(e) => {
                                            productForm.setValue("price", parseInt(e.target.value));
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={productForm.control}
                        name={`quantity`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Quantity" min={1} type='number'
                                        onChange={(e) => {
                                            productForm.setValue("quantity", parseInt(e.target.value));
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='mt-2 flex justify-center'>
                        <Button >Add Product</Button>
                    </div>
                </form>
            </Form>

        </div >
    )
}

const ProductsForm = ({ form }: Props) => {
    const { fields, remove } = useFieldArray({ name: "Product", control: form.control });

    return (
        <div className='border p-2  overflow-y-auto max-h-96'>
            {
                fields.map((f, index) => (
                    <div key={f.id} className='border-b-2 pb-3 mt-2' >
                        <div className='flex justify-end'>
                            <Button onClick={() => {
                                remove(index)
                                form.setValue('total', getSubTotal(form.getValues('Product')) - form.getValues('discount'))

                            }} className='bg-red-500 p-2 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </Button>
                        </div>

                        <FormField
                            control={form.control}
                            name={`Product.${index}.name`}
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

                        <FormField
                            control={form.control}
                            name={`Product.${index}.quantity`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>quantity</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="quantity" type='number' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`Product.${index}.price`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>price</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="price" type='number'

                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
                                                field.onChange(newValue);
                                                form.setValue(`Product.${index}.price`, newValue);
                                                const quantity = form.getValues(`Product.${index}.quantity`);
                                                const total = newValue * quantity;
                                                form.setValue(`Product.${index}.totalPrice`, total);
                                                form.setValue('total', getSubTotal(form.getValues('Product')) - form.getValues('discount'))

                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                ))}

            {fields.length == 0 && <div className='text-xl text-center font-bold'>No Products yet</div>}
        </div>

    );
}