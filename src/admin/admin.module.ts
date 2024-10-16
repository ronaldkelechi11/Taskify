/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/utils/schemas/task.schema';
import { User, UserSchema } from 'src/utils/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';


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
        AuthModule
    ],
    controllers: [
        AdminController
    ],
    providers: [
        AdminService
    ],
    exports: [
        AdminService
    ]
})
export class AdminModule { }
