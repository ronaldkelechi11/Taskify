/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorator/user.decorator';
import { RoleGuard } from './guards/role.guard';

@UseGuards(AuthGuard)
@Controller('room')
export class RoomController {
  constructor(private _roomService: RoomService) {}

  // Create a New Room the User creating becomes ADMIN
  @Post()
  createNewRoom(@Body('room_name') room_name: string, @User() userId: string) {
    return this._roomService.createRoom(room_name, userId);
  }

  // Delete a ROOM
  @UseGuards(RoleGuard)
  @Delete(':roomId')
  deleteRoom(@Param('roomId') roomId: string) {
    return this._roomService.deleteRoom(roomId);
  }
}
