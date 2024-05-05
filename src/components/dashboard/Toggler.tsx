"use client"
import { Home, LineChart, Package, Package2, PanelLeft, Receipt, ShoppingCart, Users2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

type Props = {}

const Toggler = (props: Props) => {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="dashboard"
                            className={"flex items-center gap-4 px-2.5  hover:text-foreground  p-1 rounded-lg " + (isActive('/dashboard') ? 'isActive' : 'inActive')}
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="invoice"
                            className={"flex items-center gap-4 px-2.5  hover:text-foreground  p-1 rounded-lg " + (isActive('/invoice') ? 'isActive' : 'inActive')}
                        >
                            <Receipt className="h-5 w-5" />
                            Invoice
                        </Link>


                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Toggler