// redis.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(); // Add your Redis connection options if needed
  }

  async set(key: string, value: string, expiresIn?: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expiresIn || 86400); // Set expiration time in seconds
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    try {
      // console.log(key, 'key');
      await this.redisClient.del(key);
      // console.log(`Key ${key} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting key ${key}:`, error);
      // Handle the error as needed
    }
  }
}
