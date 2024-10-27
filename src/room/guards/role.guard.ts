/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from 'src/utils/schemas/room.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(@InjectModel(Room.name) private _roomModel: Model<Room>) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const roomId = request.params.roomId;
    const userId = request.user;

    const getIsAdmin = await this._roomModel.findOne({
      _id: roomId,
      admin: userId,
    });

    return !!getIsAdmin;
  }
}
