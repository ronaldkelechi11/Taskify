/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "src/utils/schemas/user.schema"
import { JwtModule } from "@nestjs/jwt"
import { jwtConstants } from "./constants/constants"


@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' }
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }