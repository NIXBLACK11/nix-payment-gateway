import { connectDB } from "@/app/lib/mongo";
import Session from "@/app/models/Session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { sessionId: string } }) {
    await connectDB();

    try {
        const { sessionId } = params;

        const session = await Session.findById(sessionId);

        if (!session) {
            return NextResponse.json({ message: "Session not found" }, { status: 404 });
        }

        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching session", error }, { status: 500 });
    }
}
