import { SaaSBuyersData } from '../types';

export async function fetchBuyers(
    publicKey: string
): Promise<SaaSBuyersData[] | null> {
    try {
        const res = await fetch(`/api/buyers/${publicKey}`);
        if (!res.ok) throw new Error('Failed to fetch buyers data');

        const data: { data: SaaSBuyersData[] } = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching buyers:', error);
        return null;
    }
}
