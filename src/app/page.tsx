"use client";

import Link from "next/link";
export default function Home() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Link href="/dapp">
                <button className="black-btn">进入银行</button>
            </Link>
        </div>
    );
}
