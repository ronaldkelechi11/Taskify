/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
const saltRounds = 10;
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { RefreshToken } from "src/utils/schemas/refresh-token.schema";
import { User } from "src/utils/schemas/user.schema";
import { jwtConstants } from "./constants/constants";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>) { }


    // Generate AccessToken and RefreshToken then {SAVE}
    async generateUsertoken(userId) {
        const access_token = this.jwtService.sign(
            {
                userId

            },
            {
                expiresIn: '15m' // access_token expires in 15 minutes
            }
        );

        const refresh_token = this.jwtService.sign(
            {
                userId
            },
            {
                expiresIn: '4d' // refresh_token expires in 4 days
            }
        );

        await this.refreshTokenModel.create({ token: refresh_token, userId: userId })
        return { access_token: access_token, refresh_token: refresh_token };
    }

    // Generate AccessToken and RefreshToken then {DELETE} old
    async updateRefreshToken(userId, oldToken) {
        const alreadyExistToken = this.refreshTokenModel.findOne({ token: oldToken });

        // If token in DB  doesn't exist return unauthorized error
        if (!alreadyExistToken) {
            throw new UnauthorizedException()
        }
        else {
            const access_token = this.jwtService.sign(
                {
                    userId

                },
                {
                    expiresIn: '15m' // access_token expires in 15 minutes
                }
            );

            const refresh_token = this.jwtService.sign(
                {
                    userId
                },
                {
                    expiresIn: '4d' // refresh_token expires in 4 days
                }
            );
            await this.refreshTokenModel.findOneAndDelete({ token: oldToken });
            await this.refreshTokenModel.create({ token: refresh_token, userId: userId })
            return { access_token: access_token, refresh_token: refresh_token };
        }

    }

    // Verify refresh token
    async verifyRefreshToken(refreshToken: string) {
        const token = await this.jwtService.verifyAsync(
            refreshToken,
            {
                secret: jwtConstants.secret,
            }
        );

        // Invlaid Refresh Token
        if (!token) {
            throw new UnauthorizedException()
        }
        // Valid Refresh-Token
        else {
            return await this.updateRefreshToken(token.userId, refreshToken)
        }
    }

    // Find by Id for AdminGuard
    async findById(id) {
        return await this.userModel.findOne({ _id: id })
    }



    // LoginUser
    async loginUser(username: string, pass: string) {
        const user = await this.userModel.findOne({ username: username })

        if (!user) {
            throw new BadRequestException('Wrong Credentials')
        }

        // check if password is correct from hashedPassword
        const correctPassword = await bcrypt.compare(pass, user.password);
        if (!correctPassword) {
            throw new BadRequestException('Wrong Credentials')
        }

        const userTokens = await this.generateUsertoken(user._id)

        return {
            message: 'User logged in',
            token: userTokens
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

    // Get new RefreshToken
    async refreshToken(refreshToken: string) {
        return this.verifyRefreshToken(refreshToken);
    }

    //Logout user
    async logoutUser(token) {
        // Find refresh-token with that userId and then delete it
        await this.refreshTokenModel.findOneAndDelete({ token: token })

        return {
            message: 'Successful'
        }
    }

}