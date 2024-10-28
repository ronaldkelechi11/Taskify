import { TaskModule } from './room-task/task.module';
import { MemberModule } from './room-member/member.module';
/* eslint-disable prettier/prettier */
import { RoomModule } from './room/room.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskModule,
    MemberModule,
    RoomModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/taskify'),
  ],

  controllers: [AppController],

  providers: [],
})
export class AppModule {}
