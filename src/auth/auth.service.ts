/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
const saltRounds = 10;
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { Model } from "mongoose";
import { RefreshToken } from "src/utils/schemas/refresh-token.schema";
import { User } from "src/utils/schemas/user.schema";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>) { }


    // Generate User Access Token and refresh token
    async generateUsertoken(userId) {
        const access_token = this.jwtService.sign({ userId });
        const refresh_token = randomUUID();
        await this.storeRefreshToken(refresh_token, userId)

        return { access_token: access_token, refresh_token: refresh_token };
    }

    // Store Refresh Token
    async storeRefreshToken(token: string, userId: string) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);

        this.refreshTokenModel.create({ token, userId, expiryDate })
    }



    // LoginUser
    async loginUser(username: string, pass: string) {
        const user = await this.userModel.findOne({ username: username })

        const correctPassword = bcrypt.compare(pass, user.password);

        if (!user) {
            throw new BadRequestException('Wrong Credentials')
        }
        // check if password is correct from hashedPassword
        else if (!correctPassword) {
            throw new BadRequestException('Wrong Credentials')
        }
        // generate and JWT token
        return {
            message: 'User logged in',
            token: this.generateUsertoken(user._id)
        }
    }

    // RegisterUser
    async registerUser(username: string, pass: string) {

        const usernameInUse = await this.userModel.findOne({ username: username })
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        if (usernameInUse) {
            throw new ConflictException('Username already in use')
        }
        else {
            const user = await this.userModel.create({ username: username, password: hashedPassword })
            const userTokens = await this.generateUsertoken(user._id)
            return {
                message: 'User Signed Up',
                token: userTokens
            }
        }
    }

    // RefreshToken
    async refreshToken(refreshToken: string) {
        const token = await this.refreshTokenModel.findOneAndDelete({
            token: refreshToken,
            expiryDate: {
                $gte: new Date()
            }
        })
        if (!token) {
            throw new UnauthorizedException()
        }

        return this.generateUsertoken(token?.userId);
    }


}