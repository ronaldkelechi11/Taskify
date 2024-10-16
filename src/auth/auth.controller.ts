/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { userInfo } from "os";

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
    getProfile(@Request() req) {
        return { userId: req.user.userId };
    }


    // POST /auth/refresh
    @Post('refresh')
    refreshTokens(@Body('token') token: string) {
        return this.authService.refreshToken(token);
    }

    // POST /auth/logout
    @Post('logout')
    logout(@Body('userId') userId: string) {
        return this.authService.logoutUser(userId);
    }

}