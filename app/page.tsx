"use client"

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const { connected } = useWallet();
	const router  = useRouter();
	useEffect(() => {
		if(connected) {
			router.push("/user");
		}
	})
	return (
		<div className="w-screen h-screen bg-[#ffffff]">
			<WalletMultiButton />
		</div>
	);
}
