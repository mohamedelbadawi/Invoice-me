"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { TooltipProvider } from "./ui/tooltip"
import { QueryClient, QueryClientProvider } from "react-query"

interface Props {
  children: ReactNode
}

const Providers = (props: Props) => {
  const queryClient = new QueryClient()

  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>

        <TooltipProvider>

          <SessionProvider>

            {props.children}

          </SessionProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
export default Providers;