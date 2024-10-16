/* eslint-disable prettier/prettier */
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskService } from './task.service';


// Only authorized users can login
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    // GET /task
    @Get()
    allTasks(@Request() req) {
        return this.taskService.listAllTaskForUser(req.user.userId);
    }

}
