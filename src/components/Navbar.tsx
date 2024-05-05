"use client"
import Link from 'next/link'
import React from 'react'
import UserInfo from './UserInfo'
import { getAuth } from '@/lib/auth'
import LoginButton from './LoginButton'
import { ThemeToggle } from './ThemeToggle'
import { useSession } from 'next-auth/react'

type Props = {}

const Navbar = (props: Props) => {
    const { data: session } = useSession();
    return (
        <div className='fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 '>
            <div className='flex  items-center justify-between  h-full gap-2 px-8  max-w-8xl'>
                <Link href={'/'} className='flex items-center gap-2'>
                    <p className='rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md-black dark:border-white'>Invoice Me</p>
                </Link>
                <div className='flex items-center gap-3 justify-center'>
                    <ThemeToggle />
                    {
                        session?.user ? (<UserInfo user={session?.user} />) : (<LoginButton text={'login'} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar