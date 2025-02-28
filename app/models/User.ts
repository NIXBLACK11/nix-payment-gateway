import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    publicKey: string;
    saasName: string;
    logoUrl: string;
    address: string;
    callBack: string;
    email: string;
}

const UserSchema = new Schema<IUser>(
    {
        publicKey: { type: String, required: true },
        saasName: { type: String, required: true },
        logoUrl: { type: String, required: true },
        address: { type: String, required: true },
        callBack: { type: String, required: true },
        email: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.User ||
    mongoose.model<IUser>('User', UserSchema);
