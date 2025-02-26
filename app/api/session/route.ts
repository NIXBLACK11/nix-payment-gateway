import { connectDB } from "@/app/lib/mongo";
import Session from "@/app/models/Session";
import Tier from "@/app/models/Tier";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { saasId, email, plan } = await req.json();

        if (!saasId || !email || !plan) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const tier = await Tier.findOne({ saasId, tier: plan });
        if (!tier) {
            return NextResponse.json({ message: "Tier not found for this SaaS and plan" }, { status: 404 });
        }

        const user = await User.findById(saasId);
        if (!user) {
            return NextResponse.json({ message: "SaaS owner not found" }, { status: 404 });
        }

        const newSession = await Session.create({
            saasId,
            saasName: user.saasName,
            email,
            address: user.address,
            logoUrl: user.logoUrl,
            plan,
            price: tier.price
        });

        return NextResponse.json({ sessionId: newSession._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating session:", error);
        return NextResponse.json({ message: "Error creating session", error }, { status: 500 });
    }
}
