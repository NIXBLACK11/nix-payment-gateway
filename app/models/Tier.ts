import mongoose, { Schema, Document } from 'mongoose';

interface ITier extends Document {
    saasId: mongoose.Types.ObjectId;
    tier: string;
    price: number;
}

const TierSchema = new Schema<ITier>(
    {
        saasId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        tier: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Tier ||
    mongoose.model<ITier>('Tier', TierSchema);
