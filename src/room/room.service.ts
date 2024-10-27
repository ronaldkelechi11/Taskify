/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/utils/schemas/room.schema';
import { Task } from 'src/utils/schemas/task.schema';
import { User } from 'src/utils/schemas/user.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private _roomModel: Model<Room>,
    @InjectModel(Task.name) private _taskModel: Model<Task>,
    @InjectModel(User.name) private _userModel: Model<User>,
  ) {}

  async createRoom(name: string, adminID: string) {
    await this._roomModel.create({
      name: name,
      admin: adminID,
      members: [adminID],
      tasks: [],
    });

    return {
      message: 'success',
    };
  }

  async deleteRoom(roomId) {
    try {
      await this._roomModel.findOneAndDelete({ _id: roomId });
    } catch (error) {
      throw new BadRequestException('No room found with that name');
    }

    return {
      message: 'sucess',
    };
  }

  // __________ EXTRAS ____________
  // RETURN USER FROM username
  async _returnUserFromUsername(username: string | string[]) {
    const user = await this._userModel.find({ username: username });
    return user;
  }

  // Check if user is a member of a room
  async _checkIsMember(user: User | User[]) {
    const userExists = await this._roomModel.find({ members: { $in: user } });
    if (userExists.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}
