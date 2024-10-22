/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Task } from './task.schema';

@Schema()
export class Room extends Document {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'User' })
  members: User[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId }, ref: 'User' })
  admin: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId }, ref: 'User' })
  tasks: Task[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
