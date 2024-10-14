/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "src/utils/schemas/user.schema"
import { JwtModule } from "@nestjs/jwt"
import { jwtConstants } from "./constants/constants"
import { RefreshToken, RefreshTokenSchema } from "src/utils/schemas/refresh-token.schema"


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: RefreshToken.name,
                schema: RefreshTokenSchema
            }
        ]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30m' }
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }