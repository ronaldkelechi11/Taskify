/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: jwtConstants.secret
      }
    );

    const user = await this.authService.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    else {
      if (user.role != 'admin') {
        throw new UnauthorizedException()
      }
      else return true
    }
  }


  // To remove the token from the header 'Authorisation'
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
