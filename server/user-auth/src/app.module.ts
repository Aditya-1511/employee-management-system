import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';
import * as appConfig from '../config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './jwt/auth.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    JwtModule.register({
      secret: appConfig.cfg.jwt.secret_key, // Change this to a secure secret key
      signOptions: { expiresIn: appConfig.cfg.jwt.login_token }, // Set the expiration time
    }),
    MongodbModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, RedisService],
})
export class AppModule {}
