export type PageKey = "home" | "saas" | "buyers";

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
    callBack: string;
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

export type SessionType = {
    _id: string;
    saasId: string;
    saasName: string;
    time: string;
    email: string;
    address: string;
    logoUrl: string;
    plan: string;
    price: number;
    hash: string;
};
