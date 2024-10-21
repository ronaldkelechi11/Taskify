/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { Task } from 'src/utils/schemas/task.schema';
import { User } from 'src/utils/schemas/user.schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(User.name) private userModel: Model<User>) { }

    async alreadyAssigned(username) {
        const exist = await this.taskModel.findOne({
            assignedTo: { $in: [(await this.returnUser(username))._id] }
        })
        return !!exist;
    }

    async returnUser(username) {
        const user = await this.userModel.findOne({ username: username })
        return user
    }

    async createTask(
        title: string,
        desc: string,
        assignedUsername
    ) {
        const task = await this.taskModel.create({
            title: title,
            description: desc,
            createdAt: Date.now(),
            isComplete: false,
            assignedTo: (await this.returnUser(assignedUsername))._id,
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


    async updateTask(
        title: string,
        desc: string,
        taskId: string,
        assignedUsername: string | [string]
    ) {
        const task = await this.taskModel.findById(taskId);
        const updatedTask = task

        // Update title
        if (task.title != title) {
            updatedTask.title = title
        }
        // Update Description
        if (task?.description != desc) {
            updatedTask.description = desc
        }

        // Update Assigned users
        const newAssignee = await this.returnUser(assignedUsername);
        if (!await this.alreadyAssigned(assignedUsername)) {
            updatedTask.assignedTo.push(newAssignee)
        }

        await this.taskModel.findOneAndUpdate({ _id: taskId }, updatedTask)
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
            tasks: tasks
        }
    }
}



