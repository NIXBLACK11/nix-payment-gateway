import { FiCreditCard, FiHome, FiLogOut, FiSettings, FiSidebar, FiUser } from "react-icons/fi";
import { PageKey } from "../types";

type SidebarProps = {
    setActivePage: (page: PageKey) => void;
    activePage: PageKey;
    setHide: (hide: boolean) => void;
    hide: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ setActivePage, activePage, setHide, hide }) => {
    const menuItems = [
        { id: 'home', label: 'Dashboard', icon: <FiHome /> },
        { id: 'user', label: 'User Profile', icon: <FiUser /> },
        // { id: 'payment', label: 'Payments', icon: <FiCreditCard /> },
        // { id: 'settings', label: 'Settings', icon: <FiSettings /> },
    ];

    return (
        <div className="h-screen flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-black">Crypto Pay</h1>
                <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-black"
                    onClick={() => {
                        setHide(!hide);
                    }}
                >
                    <FiSidebar />
                </button>
            </div>

            <nav className="flex-grow py-6">
                <ul className="space-y-1">
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActivePage(item.id as PageKey)}
                                className={`w-full flex items-center px-4 py-3 text-sm ${activePage === item.id
                                        ? 'bg-gray-100 text-black font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button className="w-full flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    <span className="mr-3"><FiLogOut /></span>
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
}
