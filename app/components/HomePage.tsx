"use client"

import { useEffect, useMemo, useState } from "react";
import { fetchUserData } from "../lib/fetchUserData";
import { FetchUserDataType } from "../types";
import { useWallet } from "@solana/wallet-adapter-react";

export const HomePage = () => {
    const { publicKey } = useWallet();
    const [userData, setUserData] = useState<FetchUserDataType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDataCaller = async () => {
            if (!publicKey) return;
            setLoading(true);

            try {
                const fetchedUserData = await fetchUserData(publicKey.toString());
                if (fetchedUserData) {
                    console.log("this here", fetchedUserData);
                    setUserData(fetchedUserData);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDataCaller();
    }, [publicKey]);

    const { totalUsers, totalTiers, averageTierPrice } = useMemo(() => {
        if (!userData || !userData.users) return { totalUsers: 0, totalTiers: 0, averageTierPrice: "0.00" };

        const totalUsers = userData.users.length;
        const totalTiers = userData.users.reduce((acc, user) => acc + user.tiers.length, 0);

        const averageTierPrice = totalTiers
            ? (userData.users.flatMap(user => user.tiers).reduce((acc, tier) => acc + tier.price, 0) / totalTiers).toFixed(2)
            : "0.00";

        return { totalUsers, totalTiers, averageTierPrice };
    }, [userData]);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-black mb-6">Dashboard</h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading data...</p>
                </div>
            ) : (
                <>
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-medium text-black mb-2">Total SaaS Partners</h3>
                            <p className="text-3xl font-semibold text-black">{totalUsers}</p>
                            <div className="h-1 w-16 bg-blue-500 mt-2 mb-2"></div>
                            <p className="text-sm text-gray-500">Connected platforms</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-medium text-black mb-2">Total Tiers</h3>
                            <p className="text-3xl font-semibold text-black">{totalTiers}</p>
                            <div className="h-1 w-16 bg-green-500 mt-2 mb-2"></div>
                            <p className="text-sm text-gray-500">Across all platforms</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-medium text-black mb-2">Avg. Tier Price</h3>
                            <p className="text-3xl font-semibold text-black">${averageTierPrice}</p>
                            <div className="h-1 w-16 bg-purple-500 mt-2 mb-2"></div>
                            <p className="text-sm text-gray-500">Per month</p>
                        </div>
                    </div>

                    {/* SaaS Partners List */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-black">SaaS Partners</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Platform
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tiers
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price Range
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        userData?.users?.length ? (
                                            userData?.users.map((user) => {
                                                // Calculate price range for each user
                                                const minPrice = Math.min(...user.tiers.map(tier => tier.price));
                                                const maxPrice = Math.max(...user.tiers.map(tier => tier.price));

                                                return (
                                                    <tr key={user._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                                                    <img src={user.logoUrl} alt={user.saasName} className="h-10 w-10" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-black">
                                                                        {user.saasName}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 truncate max-w-xs">
                                                                        {user.publicKey.slice(0, 6)}...{user.publicKey.slice(-4)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900 truncate max-w-xs">
                                                                {user.address.slice(0, 6)}...{user.address.slice(-4)}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex flex-wrap gap-1">
                                                                {user.tiers.map((tier) => (
                                                                    <span key={tier._id} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                                                        {tier.tier}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="text-sm text-gray-900">
                                                                ${minPrice} - ${maxPrice}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button className="text-black hover:text-gray-700 mr-3">
                                                                View
                                                            </button>
                                                            <button className="text-black hover:text-gray-700">
                                                                Manage
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center text-gray-500 py-4">No users found</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}