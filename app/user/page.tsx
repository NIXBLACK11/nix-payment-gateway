'use client';

import { useEffect, useState } from 'react';
import { FiSidebar } from 'react-icons/fi';
import { Sidebar } from '../components/Sidebar';
import { MainPart } from '../components/MainPart';
import { PageKey } from '../types';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

export default function User() {
    const [hide, setHide] = useState(false);
    const [activePage, setActivePage] = useState<PageKey>('home');
    const { connected } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!connected) router.push('../');
    }, [connected]);

    return (
        <div className="max-w-screen min-h-screen bg-white">
            {!hide ? (
                <div className="w-full h-full flex flex-row">
                    <div className="w-2/12 flex flex-col justify-between bg-white border-r border-gray-200">
                        <Sidebar
                            setActivePage={setActivePage}
                            activePage={activePage}
                            setHide={setHide}
                            hide={hide}
                        />
                    </div>
                    <div className="w-10/12 bg-white">
                        <MainPart activePage={activePage} />
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-row">
                    <div className="w-[3%] flex flex-col items-center justify-start bg-white border-r border-gray-200">
                        <div className="flex flex-row justify-between items-center m-4 fixed">
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-black"
                                onClick={() => {
                                    setHide(!hide);
                                }}
                            >
                                <FiSidebar />
                            </button>
                        </div>
                    </div>
                    <div className="w-[97%] bg-white">
                        <MainPart activePage={activePage} />
                    </div>
                </div>
            )}
        </div>
    );
}
