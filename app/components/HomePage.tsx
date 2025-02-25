"use client"

import { useEffect, useMemo, useState } from "react";
import { fetchUserData } from "../lib/fetchUserData";
import { FetchUserDataType, UserType, TierType, PageKey } from "../types";
import { useWallet } from "@solana/wallet-adapter-react";
import { updateUserData } from "../lib/updateUserData";

export const HomePage = () => {
    const { publicKey } = useWallet();
    const [userData, setUserData] = useState<FetchUserDataType | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [editingUser, setEditingUser] = useState<UserType | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [newTier, setNewTier] = useState<Partial<TierType>>({ tier: "", price: 0 });
    const [editingTierIndex, setEditingTierIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserDataCaller = async () => {
            if (!publicKey) return;
            setLoading(true);

            try {
                const fetchedUserData = await fetchUserData(publicKey.toString());
                if (fetchedUserData) {
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

    useEffect(() => {
        if (copiedId) {
            const timer = setTimeout(() => {
                setCopiedId(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [copiedId]);

    const { totalUsers, totalTiers, averageTierPrice } = useMemo(() => {
        if (!userData || userData.length === 0) return { totalUsers: 0, totalTiers: 0, averageTierPrice: "0.00" };

        const totalUsers = userData.length;
        const totalTiers = userData.reduce((acc, user) => acc + user.tiers.length, 0);

        const averageTierPrice = totalTiers
            ? (userData.flatMap(user => user.tiers).reduce((acc, tier) => acc + tier.price, 0) / totalTiers).toFixed(2)
            : "0.00";

        return { totalUsers, totalTiers, averageTierPrice };
    }, [userData]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(text);
    };

    const handleEditUser = (user: UserType) => {
        setEditingUser({ ...user, tiers: [...user.tiers] });
        setShowEditModal(true);
        setNewTier({ tier: "", price: 0 });
        setEditingTierIndex(null);
    };

    const handleSaveEdit = async () => {
        try {
            setLoadingUpdate(true);
            if (!editingUser || !userData) return;

            const updatedUser = await updateUserData(editingUser._id, editingUser);

            if (updatedUser) {
                // Update local state after API update
                const updatedUserData = userData.map(user =>
                    user._id === updatedUser._id ? updatedUser : user
                );

                setUserData(updatedUserData);
            }

            setShowEditModal(false);
            setEditingUser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingUpdate(false);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingUser) return;

        setEditingUser({
            ...editingUser,
            [e.target.name]: e.target.value
        });
    };

    const handleNewTierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewTier(prev => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || 0 : value
        }));
    };

    const handleAddTier = () => {
        if (!editingUser || !newTier.tier) return;

        // Create a new tier with a temporary ID
        const newTierObject: TierType = {
            _id: `temp-${Date.now()}`,
            saasId: editingUser._id,
            tier: newTier.tier,
            price: newTier.price || 0
        };

        setEditingUser({
            ...editingUser,
            tiers: [...editingUser.tiers, newTierObject]
        });

        setNewTier({ tier: "", price: 0 });
    };

    const handleRemoveTier = (tierIndex: number) => {
        if (!editingUser) return;

        const updatedTiers = [...editingUser.tiers];
        updatedTiers.splice(tierIndex, 1);

        setEditingUser({
            ...editingUser,
            tiers: updatedTiers
        });
    };

    const handleEditTier = (tierIndex: number) => {
        if (!editingUser) return;

        const tier = editingUser.tiers[tierIndex];
        setNewTier({ tier: tier.tier, price: tier.price });
        setEditingTierIndex(tierIndex);
    };

    const handleUpdateTier = () => {
        if (!editingUser || editingTierIndex === null || !newTier.tier) return;

        const updatedTiers = [...editingUser.tiers];
        updatedTiers[editingTierIndex] = {
            ...updatedTiers[editingTierIndex],
            tier: newTier.tier,
            price: newTier.price || 0
        };

        setEditingUser({
            ...editingUser,
            tiers: updatedTiers
        });

        setNewTier({ tier: "", price: 0 });
        setEditingTierIndex(null);
    };

    const handleCancelTierEdit = () => {
        setNewTier({ tier: "", price: 0 });
        setEditingTierIndex(null);
    };

    return (
        <div className="bg-white min-h-screen">
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
                            <h3 className="text-lg font-medium text-black mb-2">Total SaaS</h3>
                            <p className="text-3xl font-semibold text-black">{totalUsers}</p>
                            <div className="h-1 w-16 bg-gray-500 mt-2 mb-2"></div>
                            <p className="text-sm text-gray-500">Connected platforms</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-medium text-black mb-2">Total Tiers</h3>
                            <p className="text-3xl font-semibold text-black">{totalTiers}</p>
                            <div className="h-1 w-16 bg-gray-500 mt-2 mb-2"></div>
                            <p className="text-sm text-gray-500">Across all platforms</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-medium text-black mb-2">Avg. Tier Price</h3>
                            <p className="text-3xl font-semibold text-black">${averageTierPrice}</p>
                            <div className="h-1 w-16 bg-gray-500 mt-2 mb-2"></div>
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Platform
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Callback URL
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tiers
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price Range
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {userData?.length ? (
                                        userData.map((user) => {
                                            const minPrice = user.tiers.length ? Math.min(...user.tiers.map(tier => tier.price)) : 0;
                                            const maxPrice = user.tiers.length ? Math.max(...user.tiers.map(tier => tier.price)) : 0;

                                            return (
                                                <tr key={user._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <img src={user.logoUrl} alt={user.saasName} className="h-10 w-10 rounded-full" />
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-black">{user.saasName}</div>
                                                                <div className="text-xs text-gray-500">{user.publicKey}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm text-gray-900 truncate max-w-[120px]">{user._id}</div>
                                                            <button
                                                                onClick={() => copyToClipboard(user._id)}
                                                                className="ml-2 p-1 hover:bg-gray-100 rounded-md"
                                                            >
                                                                {copiedId === user._id ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                                                        <path d="M20 6L9 17l-5-5"></path>
                                                                    </svg>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                                                                    </svg>
                                                                }
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.address}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.callBack}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {user.tiers.map((tier) => (
                                                            <span key={tier._id} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 mr-1">
                                                                {tier.tier} (${tier.price})
                                                            </span>
                                                        ))}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.tiers.length ? `$${minPrice} - $${maxPrice}` : "No tiers"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => handleEditUser(user)}
                                                            className="text-gray-600 hover:text-black px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center text-gray-500 py-4">No users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Edit Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-black">Edit SaaS Partner</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-black"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Basic Information */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <h4 className="text-md font-medium text-black mb-3">Basic Information</h4>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID (Read-only)</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={editingUser._id}
                                        readOnly
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(editingUser._id)}
                                        className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
                                    >
                                        {copiedId === editingUser._id ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                                            </svg>
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">SaaS Name</label>
                                <input
                                    type="text"
                                    name="saasName"
                                    value={editingUser.saasName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                                <input
                                    type="text"
                                    name="logoUrl"
                                    value={editingUser.logoUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editingUser.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Callback URL</label>
                                <input
                                    type="text"
                                    name="callBack"
                                    value={editingUser.callBack}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        {/* Tiers Management */}
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-black mb-3">Tiers Management</h4>

                            {/* Current Tiers */}
                            <div className="mb-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-2">Current Tiers</h5>
                                {editingUser.tiers.length > 0 ? (
                                    <div className="space-y-2">
                                        {editingUser.tiers.map((tier, index) => (
                                            <div key={tier._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                                                <div>
                                                    <span className="font-medium text-black">{tier.tier}</span>
                                                    <span className="ml-3 text-gray-500">${tier.price}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEditTier(index)}
                                                        className="text-gray-600 hover:text-black p-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveTier(index)}
                                                        className="text-gray-600 hover:text-red-500 p-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M3 6h18"></path>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No tiers available</p>
                                )}
                            </div>

                            {/* Add/Edit Tier Form */}
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                <h5 className="text-sm font-medium text-gray-700 mb-3">
                                    {editingTierIndex !== null ? "Edit Tier" : "Add New Tier"}
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tier Name</label>
                                        <input
                                            type="text"
                                            name="tier"
                                            value={newTier.tier}
                                            onChange={handleNewTierChange}
                                            placeholder="e.g. Basic, Premium, Enterprise"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={newTier.price}
                                            onChange={handleNewTierChange}
                                            min="0"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    {editingTierIndex !== null && (
                                        <button
                                            onClick={handleCancelTierEdit}
                                            className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={editingTierIndex !== null ? handleUpdateTier : handleAddTier}
                                        disabled={!newTier.tier}
                                        className={`px-3 py-1 rounded ${!newTier.tier ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                                    >
                                        {editingTierIndex !== null ? "Update Tier" : "Add Tier"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6 space-x-2">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                            >
                                {loadingUpdate ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Save All Changes"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};