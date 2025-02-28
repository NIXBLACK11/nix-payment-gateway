import { SessionType } from '../types';

export async function fetchSession(
    sessionId: string
): Promise<SessionType | null> {
    try {
        const res = await fetch(`/api/session/${sessionId}`);

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error('Error fetching session:', error);
        return null;
    }
}
