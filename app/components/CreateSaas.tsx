import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';

export const CreateSaas = () => {
    const { publicKey } = useWallet();
    const [loading, setLoading] = useState(false);
    const [, setResponse] = useState('');
    const [formData, setFormData] = useState({
        publicKey: publicKey?.toString(),
        saasName: '',
        logoUrl: '',
        address: '',
        callBack: '',
        tiers: [
            { tier: 'Starter', price: 5 },
            { tier: 'Growth', price: 20 },
            { tier: 'Premium', price: 50 },
        ]
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTierChange = (index: number, field: string, value: string) => {
        const updatedTiers = [...formData.tiers];
        updatedTiers[index] = {
            ...updatedTiers[index],
            [field]: field === 'price' ? Number(value) : value
        };

        setFormData({
            ...formData,
            tiers: updatedTiers
        });
    };

    const addTier = () => {
        setFormData({
            ...formData,
            tiers: [...formData.tiers, { tier: '', price: 0 }]
        });
    };

    const removeTier = (index: number) => {
        const updatedTiers = formData.tiers.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            tiers: updatedTiers
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse("Error: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-black mb-6">Create New SaaS</h1>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="saasName" className="block text-sm font-medium text-gray-700 mb-1">
                                SaaS Name
                            </label>
                            <input
                                type="text"
                                id="saasName"
                                name="saasName"
                                value={formData.saasName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700 mb-1">
                                Public Key
                            </label>
                            <input
                                type="text"
                                id="publicKey"
                                name="publicKey"
                                readOnly
                                value={formData.publicKey}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                Logo URL
                            </label>
                            <input
                                type="url"
                                id="logoUrl"
                                name="logoUrl"
                                value={formData.logoUrl}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Merchant Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="callBack" className="block text-sm font-medium text-gray-700 mb-1">
                                Callback URL
                            </label>
                            <input
                                type="text"
                                id="callBack"
                                name="callBack"
                                value={formData.callBack}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-black">Pricing Tiers</h3>
                            <button
                                type="button"
                                onClick={addTier}
                                className="px-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600"
                            >
                                Add Tier
                            </button>
                        </div>

                        {formData.tiers.map((tier, index) => (
                            <div key={index} className="flex space-x-4 mb-3 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tier Name
                                    </label>
                                    <input
                                        type="text"
                                        value={tier.tier}
                                        onChange={(e) => handleTierChange(index, 'tier', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={tier.price}
                                        onChange={(e) => handleTierChange(index, 'price', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeTier(index)}
                                    disabled={formData.tiers.length <= 1}
                                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="h-1 w-full bg-gray-200 mb-6"></div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 disabled:opacity-50 flex items-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Create Payment Gateway'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};