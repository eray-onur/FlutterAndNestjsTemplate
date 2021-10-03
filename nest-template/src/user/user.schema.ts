import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    _id: string;
    @Prop()
    email: string;
    @Prop()
    username: string;
    @Prop()
    password: string;
    @Prop()
    created_at: Date;
    @Prop()
    modified_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);