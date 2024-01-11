import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(payload: any) {
    console.log(payload, 'payload');

    // Implement your user validation logic
    // Return the user if valid, otherwise return null
    // Example: const user = await this.userService.findByPayload(payload);
    //          return user;

    // const user = await this.appService.findOne(payload.email_address);
    // return user;
  }

  async createToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    await this.redisService.set(`Bearer ${token}`, user.userId, 86400); // Store token in Redis with a TTL of 1 hour
    return token;
  }

  async deleteToken(token: string): Promise<void> {
    // console.log(token, 'token');
    await this.redisService.del(token);
  }
}
