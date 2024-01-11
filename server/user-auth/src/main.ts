import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';
import * as cors from 'cors';
// import * as config from 'config';

async function bootstrap() {
  // dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Apply CORS middleware before any other middleware or routes
  app.use(
    cors({
      // origin: '*',
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

  // console.log(process.env.DB_URL, config.cfg.port, 'process.env.DB_URL');

  // await app.listen(config.cfg.port);
  await app.listen(5000);
  // console.log(`Server is running on port ${config.cfg.port}`);
  console.log(`Server is running on port 5000`);
}

bootstrap();
