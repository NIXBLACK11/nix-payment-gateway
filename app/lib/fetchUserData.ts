import { FetchUserDataType } from "../types";

export async function fetchUserData(publicKey: string): Promise<FetchUserDataType | null> {
    try {
        const res = await fetch(`/api/users/${publicKey}`);

        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        const users: FetchUserDataType = data.users;
        return users;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
