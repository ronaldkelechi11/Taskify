/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AdminGuard, AuthGuard)
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }


    // Create Task
    @Post('create')
    createtask() {

    }

    // Update Task
    @Put('update/:id')
    updateTask() {

    }

    // Delete Task
    @Delete('delete/:id')
    deleteTasks() {

    }

    // List All Tasks
    @Get()
    getAllTasks() {
        return 'success'
    }
}
