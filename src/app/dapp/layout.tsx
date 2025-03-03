'use client'
import "./wallet.css";
import dynamic from 'next/dynamic'

const Web3Provider = dynamic(
  () => import('@/components/Web3Provider'),
  { ssr: false }
);

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
