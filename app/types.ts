export type PageKey = "home" | "user";

export type TierType = {
    _id: string;
    saasId: string;
    tier: string;
    price: number;
};

export type UserType = {
    _id: string;
    publicKey: string;
    saasName: string;
    logoUrl: string;
    address: string;
    tiers: TierType[];
};

export type FetchUserDataType = UserType[];

export type BuyerType = {
    email: string;
    plan: string;
    price: number | null;
    time: string;
};

export type SaaSBuyersData = {
    saasName: string;
    buyers: BuyerType[];
};