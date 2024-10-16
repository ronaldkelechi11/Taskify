/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema()
export class User extends Document {
    @Prop({ required: true, immutable: true })
    username: string

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);