import { connectDB } from "@/app/lib/mongo";
import Buyer from "@/app/models/Buyer";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
	await connectDB();
	try {
		const { saasId, email, plan } = await req.json();

		const newBuyer = await Buyer.create({ saasId, email, plan, time: new Date() });

		return NextResponse.json({ message: "Buyer Created", buyer: newBuyer }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Error Creating Buyer", error }, { status: 500 });
	}
}
