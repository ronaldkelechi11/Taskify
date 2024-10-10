/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/utils/schemas/task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }
    // Add task
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

    //TODO: delete task
    async deleteTask(taskId: string) {

    }

    //TODO: Update task
    async updateTask() {

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
