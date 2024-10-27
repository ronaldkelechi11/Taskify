/* eslint-disable prettier/prettier */
import { MemberController } from './member.controller';
import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/utils/schemas/user.schema';
import { Room, RoomSchema } from 'src/utils/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
