import { UserType } from "../types";

export async function updateUserData(userId: string, updatedUser: UserType): Promise<UserType | null> {
    try {
      const res = await fetch(`/api/users/updateSaas/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
  
      if (!res.ok) throw new Error("Failed to update user");
  
      const data = await res.json();
      return { ...data.user, tiers: data.tiers };
    } catch (error) {
      console.error("Error updating user data:", error);
      return null;
    }
  }
  