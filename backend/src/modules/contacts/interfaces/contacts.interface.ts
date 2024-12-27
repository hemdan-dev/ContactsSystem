import { Document } from 'mongoose';

export interface IContacts extends Document {
    name: string;
    phone: string;
    address: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}