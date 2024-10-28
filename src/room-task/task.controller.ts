/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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

  @Get('admin')
  getAllRoomTask(@Room() roomId: string) {
    return this._taskService.listAllTask(roomId);
  }
}
