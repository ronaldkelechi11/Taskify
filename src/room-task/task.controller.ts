/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from 'src/utils/dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/room/guards/role.guard';
import { Room } from 'src/utils/decorator/room.decorator';
import { User } from 'src/auth/decorator/user.decorator';

@UseGuards(AuthGuard)
@Controller('room/:roomId/task')
export class TaskController {
  constructor(private _taskService: TaskService) {}

  @UseGuards(RoleGuard)
  @Post()
  createTask(@Body() _taskDto: TaskDto, @Param('roomId') roomId: string) {
    return this._taskService.createTask(
      _taskDto.title,
      _taskDto.description,
      _taskDto.assignedTo,
      roomId,
    );
  }

  @Get()
  getSpecificUserTask(@User() userId: string) {
    return this._taskService.listTaskForSpecificUser(userId);
  }

  @UseGuards(RoleGuard)
  @Get('admin')
  getAllRoomTask(@Room() roomId: string) {
    return this._taskService.listAllTask(roomId);
  }

  @UseGuards(RoleGuard)
  @Delete()
  deleteTask(@Room() roomId: string, @Body('taskId') taskId: string) {
    return this._taskService.deleteTask(taskId, roomId);
  }

  @UseGuards(RoleGuard)
  @Put()
  updateTask(@Body() taskDto: TaskDto, @Room() roomId: string) {
    return this._taskService.updateTask(
      taskDto.title,
      taskDto.description,
      roomId,
    );
  }

  @UseGuards(RoleGuard)
  @Put('/status')
  markTaskComplete(@Body('taskId') taskId: string) {
    console.log(taskId);

    return this._taskService.markComplete(taskId);
  }
}
