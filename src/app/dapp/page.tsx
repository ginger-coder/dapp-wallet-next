"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import depositContractABI from "@/abis/depositContract.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const Page: React.FC = () => {
    const [balance, setBalance] = useState<string>("");
    const [depositBalance, setDepositBalance] = useState<string>("");
    const { address, isConnecting, isDisconnected, isConnected } = useAccount();

    // 获取实例

    const [inputAmount, setInputAmount] = useState("");
    const [inputWithdrawAmount, setInputWithdrawAmount] = useState("");
    const [message, setMessage] = useState("");
    const provider = useRef<ethers.providers.Web3Provider | null>(null);
    const signer = useRef<ethers.Signer | null>(null);
    const contract = useRef<ethers.Contract | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAmount(e.target.value);
    };
    const handleInputWithdrawChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputWithdrawAmount(e.target.value);
    };

    const handleGetBalance = async () => {
        console.log("contract.current", contract.current);

        const balance = await contract.current?.getBalance();
        const amount = ethers.utils.formatEther(balance.toString());
        setDepositBalance(amount);
    };

    const handleDeposit = async () => {
        try {
            const amount = ethers.utils.parseEther(inputAmount);
            // console.log("contract.current?.deposit", await contract.current?.ownerWithdraw());
            await contract.current?.deposit({ value: amount });
            setMessage("充值成功");
            setInputAmount("");
            handleGetBalance();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else if (typeof error === "string") {
                setMessage(error);
            } else {
                console.log("未知错误:", error);
            }
        }
    };

    const handleWithdraw = async () => {
        try {
            const amount = ethers.utils.parseEther(inputWithdrawAmount);
            await contract.current?.withdraw(amount);
            setMessage("提取成功");
            setInputAmount("");
            handleGetBalance();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else if (typeof error === "string") {
                setMessage(error);
            } else {
                console.log("未知错误:", error);
            }
        }
    };

    const handleWithdrawAll = async () => {
        try {
            await contract.current?.ownerWithdraw();
            setMessage("全部余额已提取");
            handleGetBalance();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else if (typeof error === "string") {
                setMessage(error);
            } else {
                console.log("未知错误:", error);
            }
        }
    };

    // 获取用户余额
    const initContract =  useCallback(async (account: string) => {
        try {
            // 创建一个与以太坊节点的连接
            provider.current = new ethers.providers.Web3Provider(
                window.ethereum
            );
            signer.current = await provider.current.getSigner();
            console.log("CONTRACT_ADDRESS", CONTRACT_ADDRESS);
            contract.current = new ethers.Contract(
                CONTRACT_ADDRESS,
                depositContractABI,
                signer.current
            );
            console.log("contract.current", contract.current);

            const balance = await provider.current.getBalance(account); // 获取余额
            setBalance(ethers.utils.formatEther(balance)); // 转换为以太坊单位并设置状态
            handleGetBalance();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else if (typeof error === "string") {
                setMessage(error);
            } else {
                console.log("未知错误:", error);
            }
        }
    }, [setBalance, setMessage]);

    useEffect(() => {
        // 如果用户已经连接钱包，获取余额
        if (isConnected && address) {
            console.log("用户已经连接钱包，获取余额", address);
            initContract(address);
        }
    }, [isConnected, address, initContract]);

    if (isConnecting) return <div>Connecting...</div>;
    if (isDisconnected) return <div>Disconnected</div>;

    return (
        <div className="p-4 space-y-6">
            {/* Balance Display */}
            <div className="text-lg">钱包余额: {balance}</div>
            <div className="text-lg">存款余额: {depositBalance}</div>

            {/* User Feedback */}
            {message && (
                <div className="p-2 mt-2 text-white bg-green-500 rounded-md">
                    {message}
                </div>
            )}

            {/* Buttons Section */}
            <div className="space-y-4">
                {/* Deposit */}
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        value={inputAmount}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded-lg w-32"
                        placeholder="输入金额"
                    />
                    <button
                        onClick={handleDeposit}
                        className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-lg"
                    >
                        充值
                    </button>
                </div>
                {/* Withdraw */}
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        value={inputWithdrawAmount}
                        onChange={handleInputWithdrawChange}
                        className="border border-gray-300 p-2 rounded-lg w-32"
                        placeholder="输入金额"
                    />
                    <button
                        onClick={handleWithdraw}
                        className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
                    >
                        提取金额
                    </button>
                </div>

                {/* Withdraw All */}
                <button
                    onClick={handleWithdrawAll}
                    className="bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-lg"
                >
                    提取全部余额
                </button>
            </div>
        </div>
    );
};

export default Page;
