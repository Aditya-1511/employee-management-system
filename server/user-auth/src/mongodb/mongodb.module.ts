import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import * as config from 'config';

// console.log(config.cfg.dbUrl, 'dburl');

@Module({
  // imports: [MongooseModule.forRoot(config.cfg.dbUrl)],
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestjs-reactjs')],
})
export class MongodbModule {}
