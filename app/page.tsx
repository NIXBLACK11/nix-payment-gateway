'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const { connected } = useWallet();
    const router = useRouter();
    useEffect(() => {
        if (connected) {
            router.push('/user');
        }
    });

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Navigation */}
            <nav className="py-4 px-6 md:px-16 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-xl">nixpay</div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#features" className="hover:text-neutral-600">
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="hover:text-neutral-600"
                        >
                            How It Works
                        </a>
                    </div>
                    {/* <button className="bg-black text-white px-6 py-2 rounded">Sign Up</button> */}
                    <WalletMultiButton />
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 px-6 md:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Simple Crypto Payments for Your Business
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-600 mb-12">
                        Accept USDC payments, get email notifications, and track
                        your sales with our easy-to-use gateway.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {/* <button className="bg-black text-white px-8 py-4 rounded text-lg font-medium">Get Started</button> */}
                        <WalletMultiButton />
                        <a
                            className="bg-white border border-neutral-300 text-black px-4 py-2 rounded text-lg font-medium"
                            href="#how-it-works"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="py-20 px-6 md:px-16 bg-neutral-50"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
                        Key Features
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-6 h-6"
                                >
                                    <path d="M21 5H3v14h18V5z" />
                                    <path d="M3 9h18" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                USDC Payments
                            </h3>
                            <p className="text-neutral-600">
                                Accept stable cryptocurrency payments without
                                volatility concerns.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-6 h-6"
                                >
                                    <path d="M22 2L11 13" />
                                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                Instant Notifications
                            </h3>
                            <p className="text-neutral-600">
                                Receive email alerts and callbacks when payments
                                are received.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-6 h-6"
                                >
                                    <path d="M3 3v18h18" />
                                    <path d="M18.5 8.5l-3.5 3.5-4-4L7 12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                30-Day Analytics
                            </h3>
                            <p className="text-neutral-600">
                                View detailed graphs of customer purchases over
                                the last month.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-10">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mb-6 mx-auto">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-3">Sign Up</h3>
                            <p className="text-neutral-600">
                                Create your account in less than 1 minutes.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mb-6 mx-auto">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                Configure
                            </h3>
                            <p className="text-neutral-600">
                                Set up your callback URL and email preferences.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mb-6 mx-auto">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                Integrate
                            </h3>
                            <p className="text-neutral-600">
                                Add our simple checkout button to your website.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full mb-6 mx-auto">
                                4
                            </div>
                            <h3 className="text-xl font-bold mb-3">Get Paid</h3>
                            <p className="text-neutral-600">
                                Receive USDC payments directly to your wallet.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Analytics Preview Section */}
            <section className="py-20 px-6 md:px-16 bg-neutral-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Monitor Your Business Growth
                            </h2>
                            <p className="text-lg text-neutral-600 mb-8">
                                Track your payment activity with our intuitive
                                dashboard. View 30-day purchase trends, customer
                                data, and transaction volumes all in one place.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full mr-3 mt-1">
                                        ✓
                                    </div>
                                    <span>
                                        Real-time transaction monitoring
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full mr-3 mt-1">
                                        ✓
                                    </div>
                                    <span>Weekly reports/analytics</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full mr-3 mt-1">
                                        ✓
                                    </div>
                                    <span>Customer purchase patterns</span>
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
                            <div className="relative w-full aspect-[16/9] rounded overflow-hidden">
                                <img
                                    src="graph.png"
                                    alt="Graph"
                                    className="h-5/6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl md:text-2xl text-neutral-600 mb-12">
                        Join thousands of businesses using our payment gateway.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <WalletMultiButton />
                        <button
                            className="bg-white border border-neutral-300 text-black px-4 py-2 rounded text-lg font-medium"
                            onClick={() => {
                                window.open(
                                    'https://calendly.com/nixblack/30min',
                                    '_blank'
                                );
                            }}
                        >
                            Schedule a Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 md:px-16 bg-neutral-100 text-neutral-800">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
                    <div>
                        <h3 className="font-bold text-xl mb-4">nixpay</h3>
                        <p className="text-neutral-600 mb-6">
                            Simple crypto payments for modern businesses.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://x.com/NIXBLACK_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                >
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#features"
                                    className="text-neutral-600 hover:text-black"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/docs"
                                    className="text-neutral-600 hover:text-black"
                                >
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-neutral-600 hover:text-black"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/NIXBLACK_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-600 hover:text-black"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/policy"
                                    className="text-neutral-600 hover:text-black"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-neutral-200">
                    <p className="text-neutral-600 text-center">
                        © 2025 nixpay. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
