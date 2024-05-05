"use client"
import { loginSchema } from '@/app/validators/auth'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { LogIn } from 'lucide-react';
type Props = {}
const Login = (props: Props) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            router.push('/');
        }
    }, [status, session, router])

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const loginResponseData = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false
            });

            if (loginResponseData?.error) {
                throw new Error('Invalid credentials');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please try again.');
        }
    }


    if (status === 'loading') {
        return (<Loading />)
    }

    return (

        <div className='flex justify-center items-center '>
            <div className='w-[350px] h-[300px] border p-3 rounded-lg mt-24'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                            <Button type="submit">Login <LogIn className='w-4 h-4 ml-1' /></Button>
                            <span className=' mr-2 text-sm text-black-600'>Don&apos;t have Account?
                                <Link href={'/register'} className='underline text-blue-600' > Register</Link>
                            </span>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    )
}

export default Login