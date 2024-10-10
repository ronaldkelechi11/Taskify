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

    }



    // RegisterUser
    async registerUser(username: string, pass: string) {
        //TODO: Check username already in use
        const usernameInUse = await this.userModel.findOne({ username: username })
        if (usernameInUse) {
            throw new ConflictException('Username already in use')
        }
        else {
            //TODO: Hash the password

            //TODO: Add to database
            this.userModel.create({ username: username, password: pass })
        }
    }
}