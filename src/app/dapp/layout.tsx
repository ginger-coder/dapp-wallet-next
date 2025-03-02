'use client'
import "./wallet.css";
import { Web3Provider } from "@/components/Web3Provider";
import Header from "@/components/Common/Header";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Web3Provider>
            <Header />
            {children}
        </Web3Provider>
    );
}
