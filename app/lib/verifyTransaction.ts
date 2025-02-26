// import { Tokens } from "@/constants/Tokens";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

export const Tokens = {
    SOL: {
        name: "Solana",
		image: "https://cryptologos.cc/logos/solana-sol-logo.png",
		mint: "So11111111111111111111111111111111111111112",
	},
	USDC: {
        name: "USD Coin",
		image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
		mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
	},
};
const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || "");

export const verifyTransaction = async (
    hash: string, 
    userPubKey: string, 
    price: number, 
    merchantPubKey: string
): Promise<boolean> => {
    try {
        console.log("🔹 Verifying transaction:", hash);

        // Fetch transaction details
        const transaction = await connection.getParsedTransaction(hash, {
            maxSupportedTransactionVersion: 0,
        });

        if (!transaction || !transaction.meta) {
            console.error("❌ Transaction not found or metadata missing.");
            return false;
        }

        // Ensure transaction was successful
        if (transaction.meta.err) {
            console.error("❌ Transaction failed with error:", transaction.meta.err);
            return false;
        }

        const { accountKeys, instructions } = transaction.transaction.message;
        if (!instructions || instructions.length === 0) {
            console.error("❌ No instructions found in the transaction.");
            return false;
        }

        // Derive Merchant's USDC Token Account
        const merchantKey = new PublicKey(merchantPubKey);
        const USDC_MINT = new PublicKey(Tokens["USDC"].mint);
        const merchantUSDCAccount = await getAssociatedTokenAddress(USDC_MINT, merchantKey);

        const payer = accountKeys[0].pubkey.toBase58(); // First signer is usually the payer
        let receiver = "";
        let amountTransferred = 0;

        for (const instruction of instructions) {
            if ("parsed" in instruction && instruction.program === "spl-token") {
                const parsed = instruction.parsed;
                if (parsed.type === "transfer") {
                    receiver = parsed.info.destination;
                    amountTransferred = parseFloat(parsed.info.amount) / 1e6; // USDC has 6 decimals
                }
            }
        }

        // Logging extracted details
        console.log("🔹 Payer:", payer);
        console.log("🔹 Receiver:", receiver);
        console.log("🔹 Amount Transferred:", amountTransferred);
        console.log("🔹 Expected Amount:", price);
        console.log("🔹 Merchant's USDC Account:", merchantUSDCAccount.toBase58());

        // **Validation Checks**
        if (payer !== userPubKey) {
            console.error("❌ Payer does not match expected user public key.");
            return false;
        }
        if (receiver !== merchantUSDCAccount.toString()) {
            console.error("❌ Receiver does not match merchant's USDC account.");
            return false;
        }
        if (amountTransferred < price) {
            console.error("❌ Transferred amount is less than expected.");
            return false;
        }

        console.log("✅ Transaction verification successful!");
        return true;
    } catch (error) {
        console.error("❌ Error verifying transaction:", error);
        return false;
    }
};

// test this
const testTransaction = async () => {
    const hash = "yioFzcpVaR1gf2MfWyGBtWKv9qzhAfzWeM5bDeNWLA7joD2ce78TXSYfw1oYuEUJfjQy8Lkkv5aRRbmGzd7Rbyp";
    const userPubKey = "FhNZ5dafuzZLQXixkvRd2FP4XsDvmPyzaHnQwEtA1mPT";
    const price = 1.0;
    const merchantPubKey = "79pPkgDk7J3k6im2A8EAbBQxXYWUW5minYAoAL1ppXDQ";

    const isValid = await verifyTransaction(hash, userPubKey, price, merchantPubKey);
    console.log("Verification Result:", isValid ? "✅ Valid Transaction" : "❌ Invalid Transaction");
};

testTransaction();