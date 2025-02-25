import { FetchUserDataType } from "../types";

export async function fetchUserData(publicKey: string): Promise<FetchUserDataType | null> {
    try {
        console.log(publicKey);
        publicKey = "123abc";
        const res = await fetch(`/api/users/${publicKey}`);

        if (!res.ok) throw new Error("Failed to fetch user data");
        console.log("brroooooo")
        const data = await res.json();
        console.log(data.users);
        const users: FetchUserDataType = data.users;
        console.log(users[0]._id);
        console.log(users[0].saasName)
        return users;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
