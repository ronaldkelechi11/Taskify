/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/room/guards/role.guard';
import { MemberService } from './member.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('room/member')
export class MemberController {
  constructor(private _memberService: MemberService) {}

  // Add Member
  @Post(':roomId')
  addMember(
    @Body('member_name') member_name: string,
    @Param('roomId') roomId: string,
  ) {
    return this._memberService.addMember(member_name, roomId);
  }

  //   Delete Member
  @Delete(':roomId')
  deleteMember(
    @Body('member_name') member_name: string,
    @Param('roomId') roomId: string,
  ) {
    return this._memberService.deleteMember(member_name, roomId);
  }
}
