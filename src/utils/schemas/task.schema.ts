/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    createdAt: string

    @Prop()
    isComplete: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assignedTo: User;

}
export const TaskSchema = SchemaFactory.createForClass(Task);
