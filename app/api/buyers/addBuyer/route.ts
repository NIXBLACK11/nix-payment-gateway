import { connectDB } from "@/app/lib/mongo";
import Buyer from "@/app/models/Buyer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { saasId, email, plan, time } = await req.json();

        if (!saasId || !email || !plan || !time) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newBuyer = await Buyer.create({ saasId, email, plan, time });

        return NextResponse.json({ message: "Buyer added successfully", buyer: newBuyer }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error adding buyer", error }, { status: 500 });
    }
}
