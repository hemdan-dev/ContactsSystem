import { Document } from 'mongoose';

export interface IUsers extends Document {
    username: string;
    password: string;
    phone: string;
    address: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}