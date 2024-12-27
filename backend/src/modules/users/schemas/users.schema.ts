import mongoose, { Schema } from "mongoose";
import { IUsers } from "../interfaces";

const UsersSchema: Schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

export const UsersModel = mongoose.model<IUsers>('Users', UsersSchema);