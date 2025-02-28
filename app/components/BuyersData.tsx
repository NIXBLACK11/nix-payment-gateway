import React, { useState, useEffect } from 'react';
import { SaaSBuyersData, BuyerType } from '../types';
import { fetchBuyers } from '../lib/fetchBuyersData';
import { useWallet } from '@solana/wallet-adapter-react';

export const BuyersData = () => {
    const { publicKey } = useWallet();
    const [buyersData, setBuyersData] = useState<SaaSBuyersData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedSaas, setExpandedSaas] = useState<string | null>(null);

    useEffect(() => {
        if (publicKey && !loading) {
            setLoading(true);
            fetchBuyers(publicKey.toString())
                .then((data) => {
                    setBuyersData(data);
                    if (!data) setError('Unable to load buyers data');
                })
                .catch((err) => {
                    setError(
                        err.message || 'An error occurred while fetching data'
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [publicKey]);

    const toggleSaasExpand = (saasName: string) => {
        if (expandedSaas === saasName) {
            setExpandedSaas(null);
        } else {
            setExpandedSaas(saasName);
        }
    };

    const getSaasChartData = (saas: SaaSBuyersData) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const buyersByDay = saas.buyers
            .filter((buyer) => new Date(buyer.time) >= thirtyDaysAgo)
            .reduce(
                (acc, buyer) => {
                    const date = new Date(buyer.time).toLocaleDateString();
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(buyer);
                    return acc;
                },
                {} as Record<string, BuyerType[]>
            );

        return Object.entries(buyersByDay)
            .map(([date, buyers]) => ({
                date,
                count: buyers.length,
                revenue: buyers.reduce(
                    (sum, buyer) => sum + (buyer.price || 0),
                    0
                ),
            }))
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-5xl mx-auto py-6 px-4">
                <h2 className="text-xl font-bold text-black mb-6">
                    SaaS Buyers Dashboard
                </h2>

                {loading && !buyersData ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin h-8 w-8 border-4 border-gray-300 rounded-full border-t-gray-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                        <p className="text-center py-4 text-gray-500">
                            {error}
                        </p>
                    </div>
                ) : !buyersData || buyersData.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                        <p className="text-center py-4 text-gray-500">
                            No SaaS data available
                        </p>
                    </div>
                ) : (
                    buyersData.map((saas) => {
                        const chartData = getSaasChartData(saas);
                        const isExpanded = expandedSaas === saas.saasName;
                        const maxCount =
                            chartData.length > 0
                                ? Math.max(...chartData.map((d) => d.count))
                                : 0;
                        const totalBuyers = chartData.reduce(
                            (sum, day) => sum + day.count,
                            0
                        );
                        const totalRevenue = chartData.reduce(
                            (sum, day) => sum + day.revenue,
                            0
                        );

                        return (
                            <div
                                key={saas.saasName}
                                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6"
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() =>
                                        toggleSaasExpand(saas.saasName)
                                    }
                                >
                                    <div>
                                        <h3 className="text-lg font-medium text-black">
                                            {saas.saasName}
                                        </h3>
                                        <div className="h-1 w-16 bg-gray-500 mt-2 mb-2"></div>
                                        <p className="text-sm text-gray-500">
                                            Buyer activity
                                        </p>
                                    </div>
                                    <div className="text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-6 animate-fadeIn">
                                        {chartData.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                No buyer data available for the
                                                last 30 days
                                            </div>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                    <div className="bg-gray-50 p-4 rounded-md">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                                                            Total Buyers (30
                                                            days)
                                                        </h4>
                                                        <p className="text-2xl font-semibold text-black">
                                                            {totalBuyers}
                                                        </p>
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-md">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                                                            Revenue (30 days)
                                                        </h4>
                                                        <p className="text-2xl font-semibold text-black">
                                                            $
                                                            {totalRevenue.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                                    Buyers Last 30 Days
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <div className="flex h-full items-end space-x-1">
                                                        {chartData.map(
                                                            (day, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="group relative flex flex-col items-center flex-1"
                                                                >
                                                                    <div
                                                                        className="w-full bg-neutral-800 hover:bg-neutral-700 transition-all"
                                                                        style={{
                                                                            height: `${maxCount > 0 ? (day.count / maxCount) * 100 : 0}px`,
                                                                            minHeight:
                                                                                day.count >
                                                                                0
                                                                                    ? '4px'
                                                                                    : '0',
                                                                        }}
                                                                    ></div>
                                                                    <div className="absolute bottom-0 transform translate-y-full pt-2">
                                                                        <span className="text-xs text-gray-500 hidden md:inline">
                                                                            {new Date(
                                                                                day.date
                                                                            ).toLocaleDateString(
                                                                                undefined,
                                                                                {
                                                                                    month: 'short',
                                                                                    day: 'numeric',
                                                                                }
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap">
                                                                        {
                                                                            day.count
                                                                        }{' '}
                                                                        buyers
                                                                        <br />$
                                                                        {day.revenue.toFixed(
                                                                            2
                                                                        )}{' '}
                                                                        revenue
                                                                        <br />
                                                                        {new Date(
                                                                            day.date
                                                                        ).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                                                        Latest Buyers
                                                    </h4>
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Email
                                                                    </th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Plan
                                                                    </th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Price
                                                                    </th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Date
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {saas.buyers
                                                                    .sort(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            new Date(
                                                                                b.time
                                                                            ).getTime() -
                                                                            new Date(
                                                                                a.time
                                                                            ).getTime()
                                                                    )
                                                                    .slice(0, 5)
                                                                    .map(
                                                                        (
                                                                            buyer,
                                                                            buyerIndex
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    buyerIndex
                                                                                }
                                                                            >
                                                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                                                    {
                                                                                        buyer.email
                                                                                    }
                                                                                </td>
                                                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                                                    {
                                                                                        buyer.plan
                                                                                    }
                                                                                </td>
                                                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                                                    {buyer.price
                                                                                        ? `$${buyer.price.toFixed(2)}`
                                                                                        : '-'}
                                                                                </td>
                                                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                                                                    {new Date(
                                                                                        buyer.time
                                                                                    ).toLocaleDateString()}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
