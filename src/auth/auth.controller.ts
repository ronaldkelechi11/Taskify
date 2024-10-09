/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // POST /auth/register --> []
    @Post('register')
    async registerUser(
        @Body('username') username: string,
        @Body('password') password: string
    ) {

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
        // req.user also has a child of username so you can use the username to search for the user info
        return req.user;
    }
}