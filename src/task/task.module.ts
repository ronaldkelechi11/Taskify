/* eslint-disable prettier/prettier */
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/utils/schemas/task.schema';
import { User, UserSchema } from 'src/utils/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Task.name,
                    schema: TaskSchema
                },
                {
                    name: User.name,
                    schema: UserSchema
                },
            ]
        ),
    ],
    controllers: [
        TaskController,],
    providers: [
        TaskService,],
    exports: [TaskService]
})
export class TaskModule { }
