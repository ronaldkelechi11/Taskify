/* eslint-disable prettier/prettier */
import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/taskify'),
  ],

  controllers: [
    AppController
  ],

  providers: [],
})
export class AppModule { }
