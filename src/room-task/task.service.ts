/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ConflictException,
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
  private message = { message: 'success' };

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

    const task = this._taskModel.create({
      title: title,
      description: desc,
      assignedTo: userIdArray,
    });

    await this._roomModel.findOneAndUpdate(
      { _id: roomId },
      { $push: { tasks: (await task)._id } },
    );

    return this.message;
  }

  //   List all task
  async listAllTask(roomId) {
    const allRoomTask = (await this._roomFromId(roomId)).populate('tasks');
    return (await allRoomTask).tasks;
  }

  //   List all task for USER
  async listTaskForSpecificUser(userId) {
    const userTask = await this._taskModel.find({ assignedTo: userId });
    return userTask;
  }

  //   Edit task
  async updateTask(title, desc, roomId) {
    const task = await this._taskModel.findOne({ _id: roomId });
    const updateTask = task;

    if (title != updateTask.title) {
      updateTask.title = title;
    }
    if (desc != updateTask.description) {
      updateTask.description = desc;
    }

    await this._taskModel.findOneAndUpdate({ _id: task._id }, updateTask);
    return this.message;
  }

  //   Delete task
  async deleteTask(taskId, roomId) {
    const task = await this._taskModel.findOne({ _id: taskId });
    console.log(task);

    await this._roomModel
      .findOneAndUpdate({ _id: roomId }, { $pull: { tasks: (await task)._id } })
      .then(async (result) => {
        await this._taskModel.deleteOne({ _id: task._id });
      })
      .catch((err) => {
        throw new ConflictException(err);
      });

    return this.message;
  }

  //   mark complete
  async markComplete(taskId) {
    await this._taskModel.findOneAndUpdate(
      { _id: taskId },
      { isComplete: true, completedAt: Date.now() },
    );
    return this.message;
  }

  //   _________EXTRAS__________
  async _userFromUsername(username): Promise<User | User[]> {
    const user = await this._userModel.find({ username: username });
    if (!user) throw new NotFoundException("User doesn't exist");
    return user;
  }

  async _roomFromId(roomId): Promise<Room> {
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
