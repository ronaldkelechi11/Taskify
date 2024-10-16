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
    console.log("Access: " + roles);

    if (!roles) {
      return true; // No roles are required for the route, allow access
    }

    // Returns the user =  userId
    const request = context.switchToHttp().getRequest();

    const user = await this.authService.findById(request.user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check if the user's role is included in the required roles for the route
    const hasRole = roles.includes(user.role)
    console.log("This users role is: " + user.role);


    // User role not included in the Role Access
    if (!hasRole) {
      throw new UnauthorizedException('Access denied: insufficient permissions');
    }

    return hasRole;

  }
}
