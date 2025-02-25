import { connectDB } from "@/app/lib/mongo";
import User from "@/app/models/User";
import Buyer from "@/app/models/Buyer";
import Tier from "@/app/models/Tier";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { publicKey: string } }) {
	await connectDB();

	try {
		const { publicKey } = await params;

		const saasList = await User.find({ publicKey });

		if (!saasList.length) {
			return NextResponse.json({ message: "No SaaS accounts found for this publicKey" }, { status: 404 });
		}

		const saasIds = saasList.map(saas => saas._id);

		const oneMonthAgo = new Date();
		oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

		const buyers = await Buyer.find({
			saasId: { $in: saasIds },
			time: { $gte: oneMonthAgo }, // Get only the past month's data
		}).sort({ time: -1 }); // Sort by date (most recent first)

		const tiers = await Tier.find({ saasId: { $in: saasIds } });

		const responseData = saasList.map(saas => ({
			saasName: saas.saasName,
			buyers: buyers
				.filter(buyer => buyer.saasId.toString() === saas._id.toString())
				.map(buyer => {
					const tier = tiers.find(t =>
						t.saasId.toString() === buyer.saasId.toString() &&
						t.tier === buyer.plan
					);

					return {
						email: buyer.email,
						plan: buyer.plan,
						price: tier ? tier.price : null,
						time: buyer.time,
					};
				}),
		}));
		console.log(responseData);

		return NextResponse.json({ data: responseData }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error fetching buyers", error }, { status: 500 });
	}
}
