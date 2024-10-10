/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from './task.service';


// Only authorized users can login
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    // POST /task/add --> []
    @Post('add')
    async addTask(
        @Request() req,
        @Body('title') title: string,
        @Body('desc') desc: string
    ) {
        return this.taskService.createTask(title, desc, req.user.userId);
    }

    // PATCH /task/complete/taskId --> []
    @Patch('complete/:id')
    async taskComplete(@Param('id') id: string) {
        return this.taskService.markAsComplete(id);
    }



}
