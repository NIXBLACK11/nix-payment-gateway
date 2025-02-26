"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PaymentModal } from "../components/PaymentModal";
import { Suspense, useEffect } from "react";

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("sessionId") || "";

    useEffect(() => {
        if (!sessionId) {
            router.push("/exampleSaas");
        }
    }, [sessionId, router]);

    return <PaymentModal sessionId={sessionId} />;
}

export default function Payment() {
    return (
        <div className="w-screen h-screen bg-[#ffffff]">
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentContent />
            </Suspense>
        </div>
    );
}
