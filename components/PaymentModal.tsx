"use client";

import { Tokens } from "@/constants/Tokens";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

export const PaymentModal = () => {
    const [email, setEmail] = useState("siddharthsinghrana11@gmail.com");
    const [saasLogoURL, setSaasLogoURL] = useState(
        "https://raw.githubusercontent.com/NIXBLACK11/animos/refs/heads/main/public/icon1.png"
    );
    const [saasName, setSaasName] = useState("animos");
    const [plan, setPlan] = useState("Premium");
    const [pricing, setPricing] = useState(10);
    const [merchantWalletAddress, setMerchantWalletAddress] = useState(
        "FhNZ5dafuzZLQXixkvRd2FP4XsDvmPyzaHnQwEtA1mPT"
    );
    const [selectedToken, setSelectedToken] = useState<keyof typeof Tokens | "">("");
    const [tokenMintAddress, setTokenMintAddress] = useState("");

    const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tokenKey = e.target.value as keyof typeof Tokens;
        setSelectedToken(tokenKey);
        setTokenMintAddress(Tokens[tokenKey]?.mint || "");
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto p-8 flex gap-16">
                {/* Left Column */}
                <div className="w-1/2">
                    <div className="flex items-center gap-2 mb-8">
                        <button className="p-2">←</button>
                        <img src={saasLogoURL} alt="Logo" className="w-8 h-8" />
                        <span className="text-black">{saasName}</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-normal text-black mb-2">
                            Subscribe to {saasName} {plan}
                        </h1>
                        <div className="text-3xl font-normal text-black mb-1">
                            US${pricing}.00
                            <span className="text-sm text-gray-500 ml-1">per month</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between py-4 border-b border-gray-100">
                            <div className="text-gray-600">
                                {saasName} {plan}
                                <div className="text-sm text-gray-400">Billed monthly</div>
                            </div>
                            <div>US${pricing}.00</div>
                        </div>

                        <div className="flex justify-between py-2 font-medium">
                            <div>Total due today</div>
                            <div>US${pricing}.00</div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-1/2">
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4">Contact information</h2>
                        <p className="w-full p-2 border border-gray-200 rounded">{email}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4">Payment method</h2>

                        <div className="mb-4">
                            <label className="text-sm font-medium">Select Token</label>
                            <select
                                className="w-full p-2 border border-gray-200 rounded mb-4"
                                value={selectedToken}
                                onChange={handleTokenChange}
                            >
                                <option value="">Select Token</option>
                                {Object.entries(Tokens).map(([key, token]) => (
                                    <option key={key} value={key}>
                                        {token.name}
                                    </option>
                                ))}
                            </select>
                            <div className="text-sm text-gray-500">Mint Address: {tokenMintAddress}</div>
                        </div>

                        <div className="mb-4">
                            <WalletMultiButton />
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="text-sm text-gray-600">
                                    I'm purchasing as a business
                                </span>
                            </label>

                            <div className="text-sm text-gray-600">
                                By subscribing, you agree to {saasName}'s Terms of Use and Privacy Policy.
                            </div>

                            <button className="w-full bg-emerald-500 text-white py-3 rounded">
                                Subscribe
                            </button>

                            <div className="text-center text-sm text-gray-400 mt-4">
                                Powered by NIX-payments • Terms • Privacy
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
