/* eslint-disable prettier/prettier */
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        TaskController,],
    providers: [
        TaskService,],
})
export class TaskModule { }
