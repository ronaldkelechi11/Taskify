/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/utils/schemas/room.schema';
import { Task } from 'src/utils/schemas/task.schema';
import { User } from 'src/utils/schemas/user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private _taskModel: Model<Task>,
    @InjectModel(User.name) private _userModel: Model<User>,
    @InjectModel(Room.name) private _roomModel: Model<Room>,
  ) {}

  //   create Task
  async createTask(
    title: string,
    desc: string,
    assignedTo: string | string[],
    roomId: string,
  ) {
    const userIdArray: string[] = [];

    if (!title || !desc || !assignedTo) {
      throw new BadRequestException(
        'Task must have title, Description and be Assigned to a Member of the room',
      );
    }

    const user = await this._userFromUsername(assignedTo);
    if (!(await this._checkIsMemberOfARoom(user, roomId))) {
      throw new NotFoundException('User is not a member of the room');
    }

    if (Array.isArray(user)) {
      user.forEach((e) => {
        userIdArray.push(e.id);
      });
    }

    await this._taskModel.create({
      title: title,
      description: desc,
      assignedTo: userIdArray,
    });
    return { message: 'success' };
  }

  //   List all task
  async listAllTask(roomId) {
    const allRoomTask = await this._roomModel.findById(roomId);
    return {
      tasks: allRoomTask.tasks,
    };
  }

  //   List all task for USER
  async listTaskForSpecificUser(userId) {
    const userTask = await this._taskModel.find({ assignedTo: userId });
    return [userTask];
  }
  //   Edit task
  //   Delete task
  //   mark complete

  //   _________EXTRAS__________
  async _userFromUsername(username): Promise<User | User[]> {
    const user = await this._userModel.find({ username: username });
    if (!user) throw new NotFoundException("User doesn't exist");
    return user;
  }

  async roomFromId(roomId): Promise<Room> {
    const room = this._roomModel.findOne({ _id: roomId });
    if (!room) {
      throw new NotFoundException('Room does not exist');
    }
    return room;
  }

  async _checkIsMemberOfARoom(userId, roomId) {
    const isMember = await this._roomModel.findOne({
      _id: roomId,
      members: { $in: userId },
    });
    return !!isMember;
  }
}
