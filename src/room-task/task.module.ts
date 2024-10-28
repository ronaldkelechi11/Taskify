/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { Task, TaskSchema } from 'src/utils/schemas/task.schema';
import { User, UserSchema } from 'src/utils/schemas/user.schema';
import { Room, RoomSchema } from 'src/utils/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
