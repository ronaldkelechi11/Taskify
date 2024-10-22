/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../interface/user.enum';



@Schema()
export class User extends Document {
    @Prop({ required: true, immutable: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true, enum: UserRole, default: UserRole.USER })
    role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User);