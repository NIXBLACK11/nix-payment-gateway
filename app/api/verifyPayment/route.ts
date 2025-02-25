import { connectDB } from "@/app/lib/mongo";
import Session from "@/app/models/Session";
import Buyer from "@/app/models/Buyer";
import Tier from "@/app/models/Tier";
import { NextRequest, NextResponse } from "next/server";

// Implement this function for actual verification
async function verifyTransaction(hash: string, pubKey: string, sessionData: any, tier: any): Promise<boolean> {
    console.log("Verifying transaction:", hash, pubKey, sessionData);
    return true; // Replace with actual verification logic
}

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { sessionId, hash, userPubKey } = await req.json();
        console.log("Here");

        if (!sessionId || !hash || !userPubKey) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const existingSessionWithHash = await Session.findOne({ hash });
        if (existingSessionWithHash) {
            return NextResponse.json({ message: "This transaction hash has already been used" }, { status: 409 });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return NextResponse.json({ message: "Session not found" }, { status: 404 });
        }

        const tier = await Tier.findOne({ saasId: session.saasId, tier: session.plan });
        if (!tier) {
            return NextResponse.json({ message: "Tier not found for this plan" }, { status: 404 });
        }

        const isValid = await verifyTransaction(hash, userPubKey, session, tier);
        if (!isValid) {
            return NextResponse.json({ message: "Transaction verification failed" }, { status: 400 });
        }

        await Session.findByIdAndUpdate(sessionId, { hash });

        await Buyer.create({
            saasId: session.saasId,
            email: session.email,
            plan: session.plan,
            time: new Date(),
        });
        console.log("Buyer created");

        return NextResponse.json({ message: "Payment verified and buyer added" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error verifying payment", error }, { status: 500 });
    }
}
