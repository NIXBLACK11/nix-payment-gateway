export async function createSession(saasId: string, email: string, plan: string): Promise<string | null> {
    try {
        const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ saasId, email, plan }),
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.sessionId;
    } catch (error) {
        console.error("Error creating session:", error);
        return null;
    }
}
