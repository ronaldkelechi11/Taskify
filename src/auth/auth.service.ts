/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/utils/schemas/user.schema";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>) { }

    // LoginUser
    async loginUser(username: string, pass: string) {
        // const user = await this.usersService.findOne(username);
        // if (user?.password !== pass) {
        //     throw new UnauthorizedException();
        // }

        // const payload = { sub: user._id, username: user.username };
        // return {
        //     access_token: await this.jwtService.signAsync(payload),
        // };
    }



    // RegisterUser
    async registerUser(username: string, pass: string) {
        //Username in use
        const usernameInUse = this.userModel.findOne({ username: username })
        if (usernameInUse) {
            throw new ConflictException('Username already in use')
        }
    }
}