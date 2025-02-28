import mongoose, { Schema, Document } from 'mongoose';

interface IBuyer extends Document {
    saasId: mongoose.Types.ObjectId;
    email: string;
    plan: string;
    price: number;
    time: Date;
}

const BuyerSchema = new Schema<IBuyer>(
    {
        saasId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        email: { type: String, required: true },
        plan: { type: String, required: true },
        price: { type: Number, required: true },
        time: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Buyer ||
    mongoose.model<IBuyer>('Buyer', BuyerSchema);
