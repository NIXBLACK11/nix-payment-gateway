'use client';

import { Tokens } from '@/constants/Tokens';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { PublicKey, Connection, VersionedTransaction } from '@solana/web3.js';
import {
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { fetchSession } from '../lib/fetchSession';
import { verifyPayment } from '../lib/verifyPayment';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';

interface PaymentModalProps {
    sessionId: string;
    RPC_URL: string;
    onRedirect: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
    sessionId,
    RPC_URL,
    onRedirect,
}) => {
    const { publicKey, signTransaction } = useWallet();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [saasLogoURL, setSaasLogoURL] = useState('');
    const [saasName, setSaasName] = useState('');
    const [plan, setPlan] = useState('');
    const [pricing, setPricing] = useState(0);
    const [merchantWalletAddress, setMerchantWalletAddress] = useState('');
    const [selectedToken, setSelectedToken] = useState<
        keyof typeof Tokens | ''
    >('');
    const [tokenMintAddress, setTokenMintAddress] = useState('');
    const connection = new Connection(RPC_URL || '', 'confirmed');
    const USDC_MINT = new PublicKey(Tokens['USDC'].mint);

    useEffect(() => {
        const fetchSessionCaller = async () => {
            const res = await fetchSession(sessionId);
            if (
                !res ||
                !res._id ||
                !res.address ||
                !res.email ||
                !res.plan ||
                !res.price ||
                !res.saasId ||
                !res.time
            ) {
                onRedirect();
                return;
            }
            setEmail(res.email);
            setSaasLogoURL(res.logoUrl);
            setSaasName(res.saasName);
            setPlan(res.plan);
            setPricing(res.price);
            setMerchantWalletAddress(res.address);
        };
        fetchSessionCaller();
    }, [sessionId]);

    const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tokenKey = e.target.value as keyof typeof Tokens;

        setSelectedToken(tokenKey);
        setTokenMintAddress(Tokens[tokenKey]?.mint || '');
    };

    const handlePayment = async () => {
        if (!publicKey || !signTransaction) {
            alert('Connect wallet to make payment!!');
            return;
        }

        try {
            setLoading(true);
            /////////////////////////////
            // const tokenInfo = await connection.getParsedAccountInfo(new PublicKey(tokenMintAddress));
            // console.log("Token Info:", tokenInfo);
            // const accountInfo = await getAccount(connection, publicKey);
            // console.log("Customer Token Balance:", accountInfo.amount.toString());
            /////////////////////////////
            const customerAccount = publicKey;
            const merchantAccount = new PublicKey(merchantWalletAddress);

            const merchantUSDCTokenAccount = await getAssociatedTokenAddress(
                USDC_MINT,
                merchantAccount,
                true,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            );

            console.log(
                'Merchant USDC Token Account:',
                merchantUSDCTokenAccount.toBase58()
            );

            const quoteResponse = await fetch(
                `https://api.jup.ag/swap/v1/quote?inputMint=${tokenMintAddress}&outputMint=${USDC_MINT.toBase58()}&amount=${pricing * 1e6}&slippageBps=50&swapMode=ExactOut`
            ).then((res) => res.json());

            console.log('Swap Quote:', quoteResponse);
            if (!quoteResponse.routePlan) {
                throw new Error(
                    'Invalid quote response. Check token selection and balance.'
                );
            }

            const swapResponse = await fetch(
                'https://api.jup.ag/swap/v1/swap',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        quoteResponse: quoteResponse, // Make sure this is formatted correctly
                        userPublicKey: customerAccount.toBase58(),
                        destinationTokenAccount:
                            merchantUSDCTokenAccount.toBase58(),
                        wrapAndUnwrapSol: true,
                    }),
                }
            ).then((res) => res.json());

            console.log('Swap Response:', swapResponse);
            if (!swapResponse.swapTransaction) {
                throw new Error('Invalid swap response. Check parameters.');
            }

            const transactionBase64 = swapResponse.swapTransaction;
            console.log('Transaction->', transactionBase64);
            const transaction = VersionedTransaction.deserialize(
                Buffer.from(transactionBase64, 'base64')
            );

            const signedTransaction = await signTransaction(transaction);
            const transactionBinary = signedTransaction.serialize();

            // Send transaction
            const signature = await connection.sendRawTransaction(
                transactionBinary,
                {
                    maxRetries: 10,
                    preflightCommitment: 'finalized',
                }
            );
            console.log(
                `Transaction Sent: https://solscan.io/tx/${signature}/`
            );

            // Confirm transaction (Fixed)
            const confirmation = await connection.confirmTransaction(
                signature,
                'finalized'
            );
            if (confirmation.value.err) {
                throw new Error(
                    `Transaction failed: ${JSON.stringify(confirmation.value.err)}`
                );
            }

            console.log(
                `Transaction Successful: https://solscan.io/tx/${signature}/`
            );

            const signature1 = bs58.encode(signedTransaction.signatures[0]);
            console.log('Transaction Signature:', signature1);
            console.log(signature, signature1);

            const response = await verifyPayment(
                sessionId,
                signature1,
                publicKey.toString()
            );
            if (!response) {
                alert('Corrupted payment');
                return;
            }

            alert('Payment Successful!');
            setTimeout(() => {
                onRedirect();
            }, 3000);
        } catch (err) {
            console.error('Payment Error:', err);
            alert('Payment Failed!');
        } finally {
            setLoading(false);
        }
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
                            US${pricing}
                            <span className="text-sm text-gray-500 ml-1">
                                per month
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between py-4 border-b border-gray-100">
                            <div className="text-gray-600">
                                {saasName} {plan}
                                <div className="text-sm text-gray-400">
                                    Billed monthly
                                </div>
                            </div>
                            <div>US${pricing}</div>
                        </div>

                        <div className="flex justify-between py-2 font-medium">
                            <div>Total due today</div>
                            <div>US${pricing}</div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-1/2">
                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4">
                            Contact information
                        </h2>
                        <p className="w-full p-2 border border-gray-200 rounded">
                            {email}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-base font-medium mb-4">
                            Payment method
                        </h2>

                        <div className="mb-4">
                            <label className="text-sm font-medium">
                                Select Token
                            </label>
                            <select
                                className="w-full p-2 border border-gray-200 rounded mb-4"
                                value={selectedToken}
                                onChange={handleTokenChange}
                            >
                                <option value="">Select Token</option>
                                {Object.entries(Tokens)
                                    .filter(([key]) => key !== 'USDC') // Skip USDC
                                    .map(([key, token]) => (
                                        <option key={key} value={key}>
                                            {token.name}
                                        </option>
                                    ))}
                            </select>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                {selectedToken && Tokens[selectedToken] && (
                                    <>
                                        <img
                                            src={Tokens[selectedToken].image}
                                            alt={Tokens[selectedToken].name}
                                            className="w-5 h-5"
                                        />
                                        <span>
                                            Mint Address: {tokenMintAddress}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <WalletMultiButton />
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="text-sm text-gray-600">
                                    {`I'm purchasing as a business`}
                                </span>
                            </label>

                            <div className="text-sm text-gray-600">
                                {`By subscribing, you agree to {saasName}'s Terms of Use and Privacy Policy.`}
                            </div>

                            {loading === true ? (
                                <div className="w-full bg-emerald-500 text-white py-3 rounded text-center">
                                    Loading...
                                </div>
                            ) : (
                                <button
                                    className="w-full bg-emerald-500 text-white py-3 rounded"
                                    onClick={() => {
                                        handlePayment();
                                    }}
                                >
                                    Subscribe
                                </button>
                            )}

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
