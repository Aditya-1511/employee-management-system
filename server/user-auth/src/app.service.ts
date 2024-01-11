import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './jwt/auth.service';
import { error } from 'console';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<any>,
    private readonly authService: AuthService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async userLogin(email_address: string, password: string) {
    const user_exists = await this.userModel.findOne({
      email_address: email_address,
    });
    // console.log(user_exists, 'user_exists');

    if (!user_exists) {
      // console.error();
      throw error('User does not exists');
    } else {
      if (password !== user_exists.password) {
        throw error('Incorrect password');
      } else {
        const user = {
          username: user_exists.user_name,
          userId: user_exists._id,
        };
        const generate_user_token = await this.authService.createToken(user);
        console.log(generate_user_token, 'generate_user_token');
        return {
          message: 'Login Successful',
          token: generate_user_token,
          user: user_exists,
        };
      }
    }
  }

  async userSignup(
    user_name: string,
    date_of_birth: string,
    phone_number: string,
    role: string,
    email_address: string,
    password: string,
    user_type: number,
    id_card_number: string,
    bank_account_number: string,
    gender: string,
    place_of_issue: string,
  ) {
    const newUser = new this.userModel({
      user_name: user_name,
      date_of_birth: date_of_birth,
      phone_number: phone_number,
      role: role,
      email_address: email_address,
      password: password,
      user_type: user_type,
      id_card_number: id_card_number,
      bank_account_number: bank_account_number,
      gender: gender,
      place_of_issue: place_of_issue,
      // empID: 2023 + 'NRP' + Math.random(),
    });

    newUser.save();

    return {
      message: 'Signup successful',
      newUser,
    };
  }

  async userList(accessToken: string) {
    console.log(accessToken);
    const pipeline = [];

    pipeline.push({
      $match: {
        user_type: {
          $ne: 1,
        },
        is_deleted: false,
      },
    });

    pipeline.push({
      $sort: {
        createdAt: -1,
      },
    });

    const result = await this.userModel.aggregate(pipeline);
    return {
      message: 'User list fetched successfully',
      result,
    };
  }

  findOne(email_address: string) {
    return this.userModel.findOne({ email_address: email_address });
  }

  async userProfile(accessToken: string, user_id: string) {
    const result = await this.userModel.findOne({ _id: user_id });
    return {
      message: 'User details fetched successfully.',
      data: result,
    };
  }

  async logout(accessToken: string) {
    // console.log(accessToken, 'accessToken');
    await this.authService.deleteToken(accessToken);
    return {
      message: 'You have been logged out successfully.',
    };
  }

  async delete(user_id: string) {
    console.log(user_id, 'user_id');

    const update = {
      $set: {
        is_deleted: true,
      },
    };
    await this.userModel.updateOne({ _id: user_id }, update);
    return {
      message: 'User removed successfully.',
    };
  }
}
