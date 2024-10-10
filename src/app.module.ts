/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants/constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/taskify'),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }
    }),
    AuthModule,
  ],

  controllers: [
    AppController
  ],

  providers: [],
})
export class AppModule { }
