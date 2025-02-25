export async function addBuyer(
    saasId: string,
    email: string,
    plan: string,
    time: Date
): Promise<boolean> {
    try {
        const res = await fetch("/api/buyers/addBuyer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ saasId, email, plan, time }),
        });

        if (!res.ok) return false;

        return true;
    } catch (error) {
        console.error("Error adding buyer:", error);
        return false;
    }
}
