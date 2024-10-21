/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskService } from './task.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/utils/interface/user.enum';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { TaskDto } from 'src/utils/dto/task.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { title } from 'process';


// Only users with jwt token can access can login
@UseGuards(AuthGuard, RoleGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    // GET task for a particular
    @Roles(UserRole.USER, UserRole.ADMIN)
    @Get()
    allTasks(@User() userId) {
        return this.taskService.listAllTaskForUser(userId);
    }

    // Create Task
    @Roles(UserRole.ADMIN)
    @Post('create')
    createtask(@Body() taskDto: TaskDto) {
        return this.taskService.createTask(taskDto.title, taskDto.description, taskDto.assignedUsername)
    }

    // Update Task
    @Roles(UserRole.ADMIN)
    @Put('update/:id')
    updateTask(
        @Body() taskDto: TaskDto,
        @Param('id') id: string,
    ) {
        return this.taskService.updateTask(taskDto.title, taskDto.description, id, taskDto.assignedUsername);
    }

    // Delete Task
    @Roles(UserRole.ADMIN)
    @Delete('delete/:id')
    deleteTasks(
        @Param('id') id: string,
    ) {
        return this.deleteTasks(id);
    }

    // Get All Tasks
    @Roles(UserRole.ADMIN)
    @Get('/admin')
    getAllTasks() {
        return 'success'
    }

}
