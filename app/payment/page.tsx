"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PaymentModal } from "../components/PaymentModal";
import { useEffect, useMemo } from "react";

export default function Payment() {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const sessionId = searchParams.get("sessionId") || "";

    useEffect(() => {
        if (!sessionId) {
            router.push("/exampleSaas");
        }
    }, [sessionId, router]);

    return (
        <div className="w-screen h-screen bg-[#ffffff]">
            <PaymentModal sessionId={sessionId} />
        </div>
    );
}
