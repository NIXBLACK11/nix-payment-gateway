import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
    saasId: mongoose.Types.ObjectId;
    saasName: string;
    time: Date;
    email: string;
    address: string;
    logoUrl: string;
    plan: string;
    price: number;
}

const SessionSchema = new Schema<ISession>({
    saasId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    saasName: { type: String, required: true },
    time: { type: Date, default: Date.now },
    email: { type: String, required: true },
    address: { type: String, required: true },
    logoUrl: { type: String, required: true },
    plan: { type: String, required: true },
    price: { type: Number, required: true },
});

const Session = mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);

export default Session;
