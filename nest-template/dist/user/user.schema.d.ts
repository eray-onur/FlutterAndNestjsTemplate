import * as mongoose from 'mongoose';
import { Document } from "mongoose";
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    username: string;
    password: string;
    created_at: Date;
    modified_at: Date;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any>, {}>;
