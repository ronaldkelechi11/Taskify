/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { Task } from 'src/utils/schemas/task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }


    async createTask(
        title: string,
        desc: string,
        userId: string) {
        const task = await this.taskModel.create({
            title: title,
            description: desc,
            createdAt: Date.now(),
            isComplete: false,
            assignedTo: userId,
        })
        return {
            message: 'success',
            task: task
        }
    }


    async deleteTask(taskId: string) {
        const deletedTask = await this.taskModel.findOneAndDelete({ _id: taskId })
        return {
            message: 'success',
            deletedTask
        }
    }

    //TODO: Update task
    async updateTask(
        title: string,
        desc: string,
        taskId: string,
    ) {
        const task = await this.taskModel.findById(taskId);
        const updatedTask = task

        if (task.title != title) {
            updatedTask.title = title
        }
        if (task.description != desc) {
            updatedTask.description = desc
        }
        const updateTask = await this.taskModel.findOneAndUpdate({ _id: taskId }, updatedTask)

        return { message: 'success' }
    }

    async markAsComplete(taskId: string) {
        const task = await this.taskModel.findById(taskId);
        await this.taskModel.findOneAndUpdate({ _id: taskId }, { isComplete: true })
        return {
            message: 'success',
            task: task
        };
    }


    async listAllTaskForUser(userId: string) {
        const tasks = await this.taskModel.find({ assignedTo: userId });
        return {
            tasks
        }
    }
}
