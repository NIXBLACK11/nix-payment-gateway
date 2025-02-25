export const UserPage = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-black mb-6">User Profile</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                        <h3 className="text-lg font-medium text-black">John Doe</h3>
                        <p className="text-gray-500">john.doe@example.com</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded" defaultValue="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full p-2 border border-gray-300 rounded" defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded" defaultValue="0x1a2b3c4d5e6f..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Token</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                            <option>ETH</option>
                            <option>USDT</option>
                            <option>USDC</option>
                        </select>
                    </div>
                </div>
                
                <div className="mt-6">
                    <button className="bg-black text-white px-4 py-2 rounded mr-2">Save Changes</button>
                    <button className="border border-gray-300 px-4 py-2 rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
}