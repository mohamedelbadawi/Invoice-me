"use client"
import { ReceiptText } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LastInvoices from "@/components/invoice/LastInvoices";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/invoices";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {}
function Dashboard(props: Props) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            return redirect('/')
        }
    }, [status, session])
    const [totalInvoices, setTotalInvoices] = useState<number>(0)
    const [thisMonthInvoices, setThisMonthInvoices] = useState<number>(0)
    const [lastMonthInvoices, setLastMonthInvoices] = useState<number>(0)
    useEffect(() => {
        async function fetchAnalytics() {
            const res = await getAnalytics();
            setTotalInvoices(res.data.totalInvoicesCount)
            setThisMonthInvoices(res.data.thisMonthInvoicesCount)
            setLastMonthInvoices(res.data.lastMonthInvoicesCount)
        }
        fetchAnalytics();
    }, [])
    return (


        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">

                <DashboardCard name="Total invoices" count={totalInvoices} />
                <DashboardCard name="This month" count={thisMonthInvoices} />
                <DashboardCard name="Last month" count={lastMonthInvoices} />
            </div>
            <LastInvoices />

        </main>

    )
}

export default Dashboard;

type DashboardCardProps = {
    name: string,
    count: number,
    description?: string
}

const DashboardCard = ({ name, count, description }: DashboardCardProps) => {
    return (


        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{name}</CardTitle>
                <ReceiptText />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-medium">{count} Invoice</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

