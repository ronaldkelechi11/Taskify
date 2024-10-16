/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "./user.schema";


@Schema()
export class Task extends Document {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    createdAt: string

    @Prop()
    isComplete: boolean

    @Prop({ type:[{type: mongoose.Schema.Types.ObjectId}], ref: 'User' })
    assignedTo: User[];

}

export const TaskSchema = SchemaFactory.createForClass(Task);
