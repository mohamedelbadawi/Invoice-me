import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Header from "@/components/dashboard/Header";
import Toggler from "@/components/dashboard/Toggler";
import { getAuth } from "@/lib/auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice Me",
  description: "Create invoices for your business",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();
  console.log((session?.user) ? 'hi' : 'no')
  return (
    <html lang="en">
      <body className={inter.className + 'antialiased min-h-screen pt-16'}>
        <Providers>
          <Toaster position="top-center" />
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col  sm:pl-14">
              <Navbar />
              {
                (session?.user) ? (<>
                  <Toggler />
                  <Header />

                </>) : <></>
              }
              <main className="grid flex-1 items-start p-2  sm:px-6 sm:py-0 md:gap-8">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
