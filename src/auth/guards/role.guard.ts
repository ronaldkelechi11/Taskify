/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = await this.authService.findById(request.user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const hasRole = roles.includes(user.role)

    if (!hasRole) {
      throw new UnauthorizedException('Access denied: insufficient permissions');
    }

    return hasRole;

  }
}
