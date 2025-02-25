export async function verifyPayment(sessionId: string, hash: string, userPubKey: string): Promise<boolean> {
    try {
        const res = await fetch("/api/verifyPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, hash, userPubKey }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Payment verification failed:", errorData.message);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error verifying payment:", error);
        return false;
    }
}
