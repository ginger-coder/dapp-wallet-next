"use client";

import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

type Chain = {
    id: number;
    name: string;
    network: string;
    rpcUrls: {
        default: {
            http: string[];
        };
    };
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
};

// const localChain: Chain = {
//     id: 1337, // 自定义链的ID
//     name: "Location", // 链的名称
//     network: "location", // 网络的名称
//     rpcUrls: {
//         default: {
//             http: ["http://127.0.0.1:8545"], // 自定义RPC URL
//         },
//     },
// 	nativeCurrency: {
// 		name: "Ether",
// 		symbol: "ETH",
// 		decimals: 18,
// 	}
// };

const sepoliaChain: Chain = {
    id: 11155111, // 自定义链的ID
    name: "Sepolia", // 链的名称
    network: "sepolia", // 网络的名称
    rpcUrls: {
        default: {
            http: [
                "https://sepolia.infura.io/v3/b593dfca524048cfa8fd1a5df65d132d",
            ], // 自定义RPC URL
        },
    },
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
    },
};

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [sepoliaChain, mainnet],
        transports: {
            // RPC URL for each chain
            [sepoliaChain.id]: http(
                `https://sepolia.infura.io/v3/b593dfca524048cfa8fd1a5df65d132d`
            ),
            [mainnet.id]: http(),
        },

        // Required API Keys
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,

        // Required App Info
        appName: "Test App",

        // Optional App Info
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
