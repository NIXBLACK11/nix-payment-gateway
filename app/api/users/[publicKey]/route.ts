import { connectDB } from "@/app/lib/mongo";
import User from "@/app/models/User";
import Tier from "@/app/models/Tier";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ publicKey: string }> }) {
    await connectDB();

    try {
        const publicKey = (await params).publicKey;
        const users = await User.find({ publicKey });
        if (!users.length) {
            return NextResponse.json({ message: "No users found for this publicKey" }, { status: 404 });
        }

        const usersWithTiers = await Promise.all(
            users.map(async (user) => {
                const tiers = await Tier.find({ saasId: user._id });
                return { ...user.toObject(), tiers };
            })
        );

        return NextResponse.json({ users: usersWithTiers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching user data", error }, { status: 500 });
    }
}
