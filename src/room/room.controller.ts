/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
}
