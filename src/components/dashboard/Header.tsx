"use client"
import React from 'react'
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Home, LineChart, Package, Receipt, Settings, ShoppingCart, Users } from 'lucide-react';
import { usePathname } from 'next/navigation'
type Props = {}

const Header = (props: Props) => {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    console.log(pathname)
    return (
        <aside className="fixed inset-y-0 left-0 z-0 hidden w-14 flex-col border-r bg-background sm:flex mt-12 ">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard"
                            className={"flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8 " + (isActive('/dashboard') ? 'isActive' : 'inActive')}
                        >
                            <Home className="h-5 w-5 " />
                            <span className="sr-only ">Dashboard</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>


                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/invoice"
                            className={"flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8 " + (isActive('/invoice') ? 'isActive' : 'inActive')}
                        >
                            <Receipt className="h-5 w-5 " />
                            <span className="sr-only ">Invoices</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Invoices</TooltipContent>
                </Tooltip>
            </nav>

        </aside>
    )
}

export default Header