import { Connection, TokenBalance } from "@solana/web3.js";
const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || "");
const EPSILON = 1e-6;

const returnAmount = (balances: TokenBalance[], merchantPubKey: string): number | null => {
    const merchantBalance = balances.find(balance => balance.owner === merchantPubKey);

    if (!merchantBalance) return null;

    const { amount, decimals } = merchantBalance.uiTokenAmount;
    const finalAmount = parseFloat(amount) / Math.pow(10, decimals);
    return finalAmount;
}

export const verifyTransaction = async (hash: string, userPubKey: string, price: number, merchantPubKey: string): Promise<boolean> => {
    try {
        const transaction = await connection.getParsedTransaction(hash, {
            maxSupportedTransactionVersion: 0,
        });

        if (!transaction || !transaction.meta) return false;

        if (transaction.meta.err) return false;

        const { accountKeys, instructions } = transaction.transaction.message;
        if (!instructions || instructions.length === 0) return false;

        const preBalances = transaction.meta.preTokenBalances;
        const postBalances = transaction.meta.postTokenBalances;

        if(!preBalances || !postBalances) return false;

        const balanceBefore = returnAmount(preBalances, merchantPubKey);
        const balanceAfter = returnAmount(postBalances, merchantPubKey);
        if(!balanceBefore || !balanceAfter) return false;

        const payer = accountKeys[0].pubkey.toBase58();
        const amountTransferred = balanceAfter-balanceBefore;

        console.log("🔹 Payer:", payer);
        console.log("🔹 Amount Transferred:", amountTransferred);
        console.log("🔹 Expected Amount:", price);

        if (payer !== userPubKey) return false;
        if (amountTransferred + EPSILON < price) return false;

        console.log("✅ Transaction verification successful!");
        return true;
    } catch (error) {
        console.log("❌ Error verifying transaction:", error);
        return false;
    }
};

// test this
// const testTransaction = async () => {
//     const hash = "29yV9247Rq97eLfzw8gf3yH8WkRe8JWpnbP2Lwpymk19aHij5igWFBrSXrp5rxG1YjN6zyAvyXAdCYiJoXcmpYrV";
//     const userPubKey = "FhNZ5dafuzZLQXixkvRd2FP4XsDvmPyzaHnQwEtA1mPT";
//     const price = 1.0;
//     const merchantPubKey = "79pPkgDk7J3k6im2A8EAbBQxXYWUW5minYAoAL1ppXDQ";

//     const isValid = await verifyTransaction(hash, userPubKey, price, merchantPubKey);
//     console.log("Verification Result:", isValid ? "✅ Valid Transaction" : "❌ Invalid Transaction");
// };

// testTransaction();