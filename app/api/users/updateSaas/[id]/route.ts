import { connectDB } from '@/app/lib/mongo';
import User from '@/app/models/User';
import Tier from '@/app/models/Tier';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();

    try {
        const id = (await params).id;
        const { saasName, logoUrl, address, callBack, email, tiers } =
            await req.json();

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { saasName, logoUrl, address, callBack, email },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        await Tier.deleteMany({ saasId: id }); //to remove ol ones

        const formattedTiers = tiers.map(
            (tier: { tier: string; price: number }) => ({
                saasId: id,
                tier: tier.tier,
                price: tier.price,
            })
        );

        await Tier.insertMany(formattedTiers);

        return NextResponse.json(
            {
                message: 'User and Tiers Updated',
                user: updatedUser,
                tiers: formattedTiers,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Error updating user', error },
            { status: 500 }
        );
    }
}
