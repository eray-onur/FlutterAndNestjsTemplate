import * as mongoose from 'mongoose';
import { Document } from "mongoose";
export declare type UserDocument = User & Document;
export declare class User {
    _id?: string;
    email: string;
    username: string;
    password: string;
    password_salt: string;
    created_at: Date;
    modified_at?: Date;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any>, {}>;
