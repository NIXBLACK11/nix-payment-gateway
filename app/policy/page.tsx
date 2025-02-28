import React from 'react';
import Link from 'next/link';

export default function Policy() {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Navigation */}
            <nav className="py-4 px-6 md:px-16 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <div className="font-bold text-xl cursor-pointer">
                            nixpay
                        </div>
                    </Link>
                </div>
            </nav>

            {/* Privacy Policy Content */}
            <div className="max-w-4xl mx-auto py-12 px-6">
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                <div className="bg-neutral-50 p-4 rounded mb-8">
                    <p className="text-neutral-700">
                        <strong>Note:</strong> nixpay is currently a proof of
                        concept in development. This privacy policy outlines our
                        intended practices as we develop our service. This
                        document will be updated as our service evolves.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
                    <p className="text-neutral-700 mb-4">
                        {`nixpay ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                        explains how we collect, use, and safeguard your information when you use our payment gateway
                        service.`}
                    </p>
                    <p className="text-neutral-700">
                        By using our service, you agree to the collection and
                        use of information in accordance with this policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        2. Information We Collect
                    </h2>
                    <p className="text-neutral-700 mb-4">
                        During this proof of concept phase, we may collect the
                        following types of information:
                    </p>
                    <ul className="list-disc pl-8 mb-4 text-neutral-700 space-y-2">
                        <li>
                            <strong>Transaction Information:</strong> Details
                            about payments processed through our platform,
                            including amounts, timestamps, and transaction IDs.
                        </li>
                        <li>
                            <strong>Account Information:</strong> Email
                            addresses and other contact information provided
                            during account setup.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        3. How We Use Your Information
                    </h2>
                    <p className="text-neutral-700 mb-4">
                        We use the collected information primarily for the
                        following purposes:
                    </p>
                    <ul className="list-disc pl-8 mb-4 text-neutral-700 space-y-2">
                        <li>To provide and maintain our service</li>
                        <li>To notify you about changes to our service</li>
                        <li>
                            To enable buyer callbacks and email notifications as
                            part of our service
                        </li>
                        <li>To provide customer support</li>
                        <li>
                            To gather analysis or valuable information to
                            improve our service
                        </li>
                        <li>To monitor the usage of our service</li>
                        <li>To detect, prevent and address technical issues</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
                    <p className="text-neutral-700 mb-4">
                        The security of your data is important to us. While we
                        strive to use commercially acceptable means to protect
                        your personal information, please note that during this
                        proof of concept phase, we are still developing our
                        security infrastructure. We recommend not using
                        sensitive or production data during this early testing
                        period.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        5. Third-Party Services
                    </h2>
                    <p className="text-neutral-700 mb-4">
                        We may employ third-party companies and individuals to
                        facilitate our service, provide the service on our
                        behalf, perform service-related tasks, or assist us in
                        analyzing how our service is used.
                    </p>
                    <p className="text-neutral-700">
                        These third parties have access to your personal
                        information only to perform these tasks on our behalf
                        and are obligated not to disclose or use it for any
                        other purpose.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">6. Analytics</h2>
                    <p className="text-neutral-700 mb-4">
                        During this development phase, we may use analytics
                        tools to help us measure traffic and usage trends for
                        the service. These tools collect information to help us
                        improve our service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        7. Changes to This Privacy Policy
                    </h2>
                    <p className="text-neutral-700 mb-4">
                        {`We may update our Privacy Policy from time to time. We will notify you of any changes by
                        posting the new Privacy Policy on this page and updating the "effective date" at the top
                        of this page.`}
                    </p>
                    <p className="text-neutral-700">
                        You are advised to review this Privacy Policy
                        periodically for any changes. Changes to this Privacy
                        Policy are effective when they are posted on this page.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">8. Contact Us</h2>
                    <p className="text-neutral-700 mb-4">
                        If you have any questions about this Privacy Policy,
                        please contact us at:
                    </p>
                    <p className="text-neutral-700">
                        Email: siddharthsinghrana11@gmail.com
                    </p>
                </section>

                <div className="border-t border-neutral-200 pt-6 text-neutral-500 text-sm">
                    <p>Last updated: February 26, 2025</p>
                    <p>
                        This privacy policy is for demonstration purposes only
                        as part of a proof of concept.
                    </p>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="py-6 px-6 md:px-16 bg-neutral-100 text-neutral-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-neutral-600 text-sm">
                        © 2025 nixpay. Proof of Concept.
                    </p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <Link href="/">
                            <span className="text-neutral-600 hover:text-black text-sm cursor-pointer">
                                Home
                            </span>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
