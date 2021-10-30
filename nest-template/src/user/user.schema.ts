import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    _id?: string;
    
    @Prop({type: String, match: /^.+?@.+?$/, required: true})
    email: string;

    @Prop({type: String, required: true})
    username: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: String, required: true})
    password_salt: string;

    @Prop({type: Date})
    created_at: Date;

    @Prop({type: Date})
    modified_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);