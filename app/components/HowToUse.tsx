import React, { useState } from 'react';

export const HowToUse = () => {
	const [activeStep, setActiveStep] = useState(1);

	const handleStepClick = (stepNumber: number) => {
		setActiveStep(stepNumber);
	};

	return (
		<div className="bg-white text-black py-20 px-6 md:px-16">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">How to Integrate Our Payment SDK</h2>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Steps navigation */}
					<div className="lg:w-1/3">
						<div className="bg-neutral-50 p-6 rounded-lg sticky top-24">
							<h3 className="text-xl font-bold mb-6">Integration Steps</h3>
							<ul className="space-y-4">
								{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
									<li
										key={step}
										className={`cursor-pointer p-3 rounded-lg flex items-center transition-colors ${activeStep === step ? 'bg-black text-white' : 'hover:bg-neutral-100'
											}`}
										onClick={() => handleStepClick(step)}
									>
										<div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${activeStep === step ? 'bg-white text-black' : 'bg-black text-white'
											}`}>
											{step}
										</div>
										<span className="text-sm">
											{step === 1 && "Create SaaS"}
											{step === 2 && "Prepare Merchant Address"}
											{step === 3 && "Get SaaS ID"}
											{step === 4 && "Install Package"}
											{step === 5 && "Import SDK"}
											{step === 6 && "Create Session"}
											{step === 7 && "Setup Payment Route"}
											{step === 8 && "Implement Payment Modal"}
											{step === 9 && "Monitor Dashboard"}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Step details */}
					<div className="lg:w-2/3">
						<div className="bg-neutral-50 p-8 rounded-lg">
							{activeStep === 1 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 1: Create a SaaS</h3>
									<p className="mb-4 text-neutral-700">{`If you haven't already, create your SaaS application on the dashboard. This will be the foundation for integrating our payment system.`}</p>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">Quick Setup</h4>
										<p className="text-neutral-600">{`Log in to your nixpay dashboard and click on "Create New SaaS" to register your application.`}</p>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">{`Once your SaaS is created, you'll be able to access your unique SaaS ID and merchant settings.`}</p>
									</div>
								</div>
							)}

							{activeStep === 2 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 2: Prepare Merchant Address</h3>
									<p className="mb-4 text-neutral-700">Ensure that your merchant address in the SaaS dashboard has a small amount of USDC already in it. This is crucial as transactions will fail without prior USDC balance.</p>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2 text-red-600">Important Note</h4>
										<p className="text-neutral-600">Your merchant address must have some USDC already in it for the system to work properly. Even a small amount is sufficient.</p>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">This requirement is to ensure transaction verification can proceed smoothly on the blockchain.</p>
									</div>
								</div>
							)}

							{activeStep === 3 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 3: Copy the SaaS ID</h3>
									<p className="mb-4 text-neutral-700">{`From your dashboard, locate and copy your unique SaaS ID. You'll need this identifier to initialize payment sessions.`}</p>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">Finding Your SaaS ID</h4>
										<p className="text-neutral-600">{`Navigate to "Dashboard" → "ID" in your dashboard. Your SaaS ID will be displayed prominently.`}</p>
										<div className="mt-4 bg-neutral-50 p-3 rounded border border-neutral-200 flex justify-between items-center">
											<code className="text-sm">saas_12345abcde67890fghij</code>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                                            </svg>
										</div>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">Keep your SaaS ID secure. It will be used to authenticate your application with our payment services.</p>
									</div>
								</div>
							)}

							{activeStep === 4 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 4: Install the Package</h3>
									<p className="mb-4 text-neutral-700">Install our payment SDK via npm in your project directory.</p>
									<div className="bg-black text-white p-6 rounded-lg mb-6 overflow-x-auto">
										<code className="text-sm">npm i @nixblack/nix-payments-sdk</code>
									</div>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">Package Information</h4>
										<p className="text-neutral-600 mb-3">Our SDK is available on npm and can be accessed at:</p>
										<a href="https://www.npmjs.com/package/@nixblack/nix-payments-sdk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-words">
											https://www.npmjs.com/package/@nixblack/nix-payments-sdk
										</a>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">Make sure you have the latest version to access all features and security updates.</p>
									</div>
								</div>
							)}

							{activeStep === 5 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 5: Import Create Session</h3>
									<p className="mb-4 text-neutral-700">Import the createSession function from our SDK in your application code.</p>
									<div className="bg-black text-white p-6 rounded-lg mb-6 overflow-x-auto">
										<code className="text-sm">{`import {'{ createSession }'} from '@nixblack/nix-payments-sdk';`}</code>
									</div>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">What is createSession?</h4>
										<p className="text-neutral-600">{`This function initializes a payment session with your SaaS ID, the customer's email, and the plan they wish to purchase.`}</p>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">The createSession function is the primary way to start the payment process in your application.</p>
									</div>
								</div>
							)}

							{activeStep === 6 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 6: Use the createSession Function</h3>
									<p className="mb-4 text-neutral-700">Implement the createSession function with the required parameters to generate a unique session ID.</p>
									<div className="bg-black text-white p-6 rounded-lg mb-6 overflow-x-auto">
										<pre className="text-sm">
											<code>
												{`const result = await createSession(saasId, email, plan);

// Example:
// const result = await createSession(
//   'saas_12345abcde67890fghij',
//   'customer@example.com',
//   'Premium'
// );`}
											</code>
										</pre>
									</div>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">Parameters</h4>
										<ul className="space-y-2 text-neutral-600">
											<li><strong>saasId</strong>: Your unique SaaS identifier from the dashboard</li>
											<li><strong>email</strong>{`: The customer's email address`}</li>
											<li><strong>plan</strong>{`: The subscription plan name (e.g., "Premium", "Basic")`}</li>
										</ul>
										<div className="mt-4 p-3 bg-neutral-50 rounded border border-neutral-200">
											<p className="text-sm text-red-600 font-medium">{`Note: Plan names are case-sensitive. Ensure they match exactly with what's configured in your dashboard.`}</p>
										</div>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">The function returns a unique session ID that will expire after a set period, so direct the user to the payment page promptly.</p>
									</div>
								</div>
							)}

							{activeStep === 7 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 7: Create a Payment Route</h3>
									<p className="mb-4 text-neutral-700">Set up a dedicated route in your application to handle the payment process using the session ID.</p>
									<div className="bg-black text-white p-6 rounded-lg mb-6 overflow-x-auto">
										<pre className="text-sm">
											<code>
												{`// Redirect user to the payment page with the session ID
router.push(\`/payment?sessionId=\${result}\`);

// Or with Next.js Link component:
<Link href={\`/payment?sessionId=\${result}\`}>
  Proceed to Payment
</Link>`}
											</code>
										</pre>
									</div>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">Best Practice</h4>
										<p className="text-neutral-600">We recommend using a dedicated route for the payment process rather than displaying the payment modal on the same page.</p>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">This approach provides a cleaner user experience.</p>
									</div>
								</div>
							)}

							{activeStep === 8 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 8: Implement the Payment Modal</h3>
									<p className="mb-4 text-neutral-700">On your payment route, import and implement the PaymentModal component.</p>
									<div className="bg-black text-white p-6 rounded-lg mb-6 overflow-x-auto">
										<pre className="text-sm">
											<code>
												{`import { PaymentModal } from "@nixblack/nix-payments-sdk";

// In your payment page component:
export default function PaymentPage() {
  // Get the session ID from the URL
  const sessionId = /* get from URL query params */;
  
  return (
    <PaymentModal
      sessionId={sessionId}
      RPC_URL={process.env.NEXT_PUBLIC_RPC_URL || ''}
      onRedirect={() => router.push("/exampleSaas")}
    />
  );
}`}
											</code>
										</pre>
									</div>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">Parameters</h4>
										<ul className="space-y-2 text-neutral-600">
											<li><strong>sessionId</strong>: The session ID returned from createSession</li>
											<li><strong>RPC_URL</strong>: Your blockchain RPC URL (preferably a dedicated one for reliability)</li>
											<li><strong>onRedirect</strong>: Function to execute after payment completion or error</li>
										</ul>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">While the mainnet RPC URL will work, we strongly recommend using a dedicated RPC provider for production environments to ensure reliability.</p>
									</div>
								</div>
							)}

							{activeStep === 9 && (
								<div>
									<h3 className="text-xl font-bold mb-4">Step 9: Monitor Your Dashboard</h3>
									<p className="mb-4 text-neutral-700">After implementation, all payment activities will be reflected in your nixpay dashboard in real-time.</p>
									<div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
										<h4 className="font-bold mb-2">Dashboard Features</h4>
										<ul className="space-y-2 text-neutral-600">
											<li>Real-time transaction monitoring</li>
											<li>Payment status updates</li>
											<li>Customer information tracking</li>
											<li>30-day analytics and graphs</li>
										</ul>
									</div>
									<div className="bg-neutral-100 p-4 rounded-lg">
										<p className="text-sm text-neutral-600">Use the dashboard to verify successful integrations and monitor your payment flows in production.</p>
									</div>
								</div>
							)}

							{/* Navigation buttons */}
							<div className="flex justify-between mt-8">
								<button
									onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
									className={`px-4 py-2 rounded ${activeStep === 1 ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-white border border-black text-black hover:bg-neutral-100'}`}
									disabled={activeStep === 1}
								>
									Previous Step
								</button>
								<button
									onClick={() => setActiveStep(Math.min(9, activeStep + 1))}
									className={`px-4 py-2 rounded ${activeStep === 9 ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:bg-neutral-900'}`}
									disabled={activeStep === 9}
								>
									Next Step
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};