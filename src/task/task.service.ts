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
    async deleteTask() {

    }

    //TODO: Update task
    async updateTask() {

    }

    // mark as Complete
    async markAsComplete(taskId: string) {
        const task = await this.taskModel.findById(taskId);

        // update in DB
        await this.taskModel.findOneAndUpdate({ _id: taskId }, { isComplete: true })

        return {
            message: 'success',
            task: task
        };
    }

    //TODO: list all task per user
    async listAllTaskForUser(userId: string) {
        // Get user id
        // search tasks for userID == assignedTo return []
    }
}
