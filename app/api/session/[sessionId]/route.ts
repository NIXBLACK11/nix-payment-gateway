import { connectDB } from '@/app/lib/mongo';
import Session from '@/app/models/Session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ sessionId: string }> }
) {
    await connectDB();

    try {
        const sessionId = (await params).sessionId;

        const session = await Session.findById(sessionId);

        if (!session) {
            return NextResponse.json(
                { message: 'Session not found' },
                { status: 404 }
            );
        }

        const now = new Date();
        const sessionTime = new Date(session.time);
        const timeDiff =
            (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);

        if (timeDiff > 6) {
            await Session.findByIdAndDelete(sessionId);
            return NextResponse.json(
                { message: 'Session expired and deleted' },
                { status: 410 }
            );
        }

        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching session', error },
            { status: 500 }
        );
    }
}
