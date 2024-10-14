/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema()
export class RefreshToken extends Document {
    @Prop()
    token: string

    @Prop()
    userId: string

    @Prop()
    expiryDate: string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);