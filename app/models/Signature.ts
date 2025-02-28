import mongoose, { Schema, Document } from 'mongoose';

export interface ISignature extends Document {
    signature: string;
}

const SignatureSchema = new Schema<ISignature>({
    signature: { type: String, required: true, unique: true },
});

const Signature =
    mongoose.models.Signature ||
    mongoose.model<ISignature>('Signature', SignatureSchema);

export default Signature;
