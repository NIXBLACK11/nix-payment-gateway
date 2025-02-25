import { connectDB } from "@/app/lib/mongo";
import Tier from "@/app/models/Tier";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	await connectDB();
	try {
		const { publicKey, saasName, logoUrl, address, callBack, tiers } = await req.json();

		if (!tiers || !Array.isArray(tiers) || tiers.length === 0) {
			return NextResponse.json({ message: "Tiers must be provided as an array." }, { status: 400 });
		}

		const newUser = await User.create({ publicKey, saasName, logoUrl, address, callBack });

		const formattedTiers = tiers.map(tier => ({
			saasId: newUser._id,
			tier: tier.tier,
			price: tier.price,
		}));

		await Tier.insertMany(formattedTiers);

		return NextResponse.json({ message: "User and Tiers Created", user: newUser, tiers: formattedTiers }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Error Creating User", error }, { status: 500 });
	}
}
