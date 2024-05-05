"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from '@/app/validators/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
type Props = {}

const Register = (props: Props) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
    async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
            const response = await axios.post('/api/auth', {
                name: values.name,
                email: values.email,
                password: values.password
            });
            if (response.status === 201) {
                toast.success(response.data.message);
                router.push('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            console.error('Registration failed:', error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='flex justify-center items-center '>
            <div className='w-[350px] h-[400px] border p-3 rounded-lg mt-24'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mohamed" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-between items-center'>

                            <Button type="submit">Register</Button>
                            <span className=' mr-2 text-sm text-black-600'>Have Account?
                                <Link href={'/login'} className='underline text-blue-600' > Login</Link>
                            </span>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Register