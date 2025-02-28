import { connectDB } from "@/app/lib/mongo";
import Session from "@/app/models/Session";
import Buyer from "@/app/models/Buyer";
import Tier from "@/app/models/Tier";
import Signature from "@/app/models/Signature";
import { NextRequest, NextResponse } from "next/server";
import { callbackQueue, emailQueue } from "@/app/lib/queue";
import User from "@/app/models/User";
import mongoose from "mongoose";
import { verifyTransaction } from "@/app/lib/verifyTransaction";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { sessionId, signature, userPubKey } = await req.json();

        if (!sessionId || !signature || !userPubKey) {
            console.log("1");
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const existingSignature = await Signature.findOne({ signature });
        if (existingSignature) {
            console.log("2");
            return NextResponse.json({ message: "This signature has already been used" }, { status: 409 });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            console.log("3");
            return NextResponse.json({ message: "Session not found" }, { status: 404 });
        }

        const tier = await Tier.findOne({ saasId: session.saasId, tier: session.plan });
        if (!tier) {
            console.log("4");
            return NextResponse.json({ message: "Tier not found for this plan" }, { status: 404 });
        }

        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(session.saasId) });
        if (!user) {
            console.log("5");
            return NextResponse.json({ message: "Saas not found" }, { status: 404 });
        }

        // Verify the transaction (replace with actual logic)
        const isValid = await verifyTransaction(signature, userPubKey, session.price, session.address);
        if (!isValid) {
            return NextResponse.json({ message: "Transaction verification failed" }, { status: 400 });
        }

        await Buyer.create({
            saasId: session.saasId,
            email: session.email,
            plan: session.plan,
            price: session.price,
            time: new Date(),
        });

        await Signature.create({ signature });

        await Session.findByIdAndDelete(sessionId);

        const emailObject = {
            buyerEmail: session.email,
            merchantEmail: user.email,
            plan: session.plan,
            saasName: user.saasName,
            logoUrl: user.logoUrl
        };

        const callBackObject = {
            callBack: user.callBack,
            plan: session.plan,
            price: tier.price,
            email: session.email,
            time: new Date(),
        }

        await callbackQueue.add("sendCallback", callBackObject);

        await emailQueue.add("sendEmail", emailObject);

        return NextResponse.json({ message: "Payment verified and buyer added" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error verifying payment", error }, { status: 500 });
    }
}
