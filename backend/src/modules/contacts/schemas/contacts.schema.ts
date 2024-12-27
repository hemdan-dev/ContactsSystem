import mongoose, { Schema } from "mongoose";
import { IContacts } from "../interfaces";

const ContactsSchema: Schema = new Schema({
    name: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    notes: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

export const ContactsModel = mongoose.model<IContacts>('Contacts', ContactsSchema);