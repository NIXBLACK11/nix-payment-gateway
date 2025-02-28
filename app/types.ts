export type PageKey = "home" | "saas" | "buyers" | "howtouse";

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
    email: string;
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
};

export type TokenBalance = {
    accountIndex: number;
    mint: string;
    owner?: string;
    programId?: string;
    uiTokenAmount: TokenAmount;
};

export type TokenAmount = {
    /** Raw amount of tokens as string ignoring decimals */
    amount: string;
    /** Number of decimals configured for token's mint */
    decimals: number;
    /** Token amount as float, accounts for decimals */
    uiAmount: number | null;
    /** Token amount as string, accounts for decimals */
    uiAmountString?: string;
};