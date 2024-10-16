/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskService } from './task.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/utils/interface/user.enum';
import { RoleGuard } from 'src/auth/guards/role.guard';


// Only users with jwt token can access can login
@UseGuards(AuthGuard, RoleGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    // GET task for only a particular
    @Roles(UserRole.USER, UserRole.ADMIN)
    @Get()
    allTasks(@Request() req) {
        return this.taskService.listAllTaskForUser(req.user.userId);
    }

    // Create Task
    @Roles(UserRole.ADMIN)
    @Post('create')
    createtask() {

    }

    // Update Task
    @Roles(UserRole.ADMIN)
    @Put('update/:id')
    updateTask() {

    }

    // Delete Task
    @Roles(UserRole.ADMIN)
    @Delete('delete/:id')
    deleteTasks() {

    }

    // Get All Tasks
    @Roles(UserRole.ADMIN)
    @Get('/all')
    getAllTasks() {
        return 'success'
    }

}
