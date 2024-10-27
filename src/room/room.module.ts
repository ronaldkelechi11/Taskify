/* eslint-disable prettier/prettier */
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/utils/schemas/room.schema';
import { Task, TaskSchema } from 'src/utils/schemas/task.schema';
import { User, UserSchema } from 'src/utils/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
