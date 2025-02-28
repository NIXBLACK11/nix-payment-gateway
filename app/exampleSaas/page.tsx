"use client"

import React, { useState } from 'react';
// import { createSession } from '../lib/createSession';
import { useRouter } from 'next/navigation';
import { createSession } from '@nixblack/nix-payments-sdk';

export default function ExampleSaas() {
    const [saasId, setSaasId] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await createSession(saasId, email, plan);
            if(!result) {
                alert("Error creating session");
                return;
            }
            router.push(`/payment?sessionId=${result}`);
        } catch (err) {
            setError("Failed to create session. Please try again.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen w-screen bg-[#ffffff] flex justify-start items-center flex-col'>
            <h1 className='text-4xl p-20'>Test Payment page</h1>
            <div className="w-4/12 mx-auto">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-medium text-black mb-4">Create Session</h2>
                    <div className="h-1 w-20 bg-gray-500 mb-6"></div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black mb-1" htmlFor="saasId">
                                SaaS ID
                            </label>
                            <input
                                id="saasId"
                                type="text"
                                value={saasId}
                                onChange={(e) => setSaasId(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black mb-1" htmlFor="plan">
                                Plan
                            </label>
                            <input
                                id="plan"
                                type="text"
                                value={plan}
                                onChange={(e) => setPlan(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? 'Creating...' : 'Create Session'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};