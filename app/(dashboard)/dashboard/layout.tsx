import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../../globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DASHBOARD | MYSHOPBD",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + "  w-full min-h-screen mx-auto"}>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <main className=" w-full flex items-start h-screen ">
                    <DashboardSidebar />
                    <div className="w-full"> {children}</div>
                </main>
            </body>
        </html>
    );
}