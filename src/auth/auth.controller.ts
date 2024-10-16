/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./decorator/user.decorator";
import { AuthGuard } from "./guards/auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // POST /auth/register --> []
    @Post('register')
    async registerUser(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        return this.authService.registerUser(username, password);
    }

    // POST /auth/login --> []
    @Post('login')
    loginUser(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        return this.authService.loginUser(username, password)
    }

    // GET /auth/profile --> []
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@User() userId: string) {
        return { userId: userId };
    }

    // POST /auth/refresh
    @Post('refresh')
    refreshTokens(@Body('token') token: string) {
        return this.authService.refreshToken(token);
    }

    // POST /auth/logout
    @Post('logout')
    logout(@Body('token') token: string) {
        return this.authService.logoutUser(token);
    }

}