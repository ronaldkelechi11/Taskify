/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/utils/schemas/room.schema';
import { User } from 'src/utils/schemas/user.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
    @InjectModel(Room.name) private _roomModel: Model<Room>,
  ) {}

  // Add member
  async addMember(username: string, roomId: string) {
    const newMember = await this._userFromUsername(username);
    await this._roomModel.findOneAndUpdate(
      { _id: roomId },
      { $push: { members: newMember } },
    );

    return {
      message: 'success',
    };
  }

  // Delete member
  async deleteMember(username: string, roomId) {
    const user = await this._userFromUsername(username);
    await this._roomModel.findOneAndUpdate(
      { _id: roomId },
      { $pull: { members: user._id } },
    );
    return {
      message: 'success',
    };
  }

  //   ____________EXTRAS_____________
  async _userFromUsername(username): Promise<User> {
    const user = await this._userModel.findOne({ username: username });
    if (!user) throw new NotFoundException("User doesn't exist");
    return user;
  }
}
