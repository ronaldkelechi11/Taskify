/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
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
        // check if username exists
        const user = await this.userModel.findOne({ username: username })
        if (!user) {
            throw new BadRequestException('Wrong Credentials')
        }
        // check if password is correct
        else if (user.password != pass) {
            throw new BadRequestException('Wrong Credentials')
        }
        // generate and JWT token
        return {
            message: 'User logged in',
            access_token: this.generateUsertoken(user._id)
        }
    }
    // Generate User Token
    generateUsertoken(userId) {
        const access_token = this.jwtService.sign({ userId });
        return access_token;
    }



    // RegisterUser
    async registerUser(username: string, pass: string) {

        const usernameInUse = await this.userModel.findOne({ username: username })
        if (usernameInUse) {
            throw new ConflictException('Username already in use')
        }
        else {
            //TODO: Hash the password
            this.userModel.create({ username: username, password: pass })
        }
    }
}