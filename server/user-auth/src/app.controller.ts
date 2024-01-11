import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('signup')
  async signup(@Req() req, @Res() res) {
    console.log(req.body, 'req');
    const {
      user_name,
      date_of_birth,
      phone_number,
      role,
      email_address,
      password,
      user_type,
      id_card_number,
      bank_account_number,
      gender,
      place_of_issue,
    } = req.body;
    const result = this.appService.userSignup(
      user_name,
      date_of_birth,
      phone_number,
      role,
      email_address,
      password,
      user_type,
      id_card_number,
      bank_account_number,
      gender,
      place_of_issue,
    );
    if (result) {
      res.send(result);
    }
  }

  @Post('login')
  async login(@Req() req, @Res() res) {
    // console.log(req.body, 'req');
    try {
      const { email_address, password } = req.body;
      console.log(req.body, 'req.body');

      const result = await this.appService.userLogin(email_address, password);
      if (result) {
        console.log(result, 'result');
        res.send(result);
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('userList')
  async userList(@Req() req) {
    const accessToken = req.headers.accesstoken;
    return this.appService.userList(accessToken);
  }

  @Get('profile/:id')
  async userProfile(@Req() req) {
    const accessToken = req.headers.accesstoken;
    // console.log(req.params, 'req.params');
    const user_id = req.params.id;
    return this.appService.userProfile(accessToken, user_id);
  }

  @Post('delete/:id')
  async delete(@Req() req) {
    const user_id = req.params.id;
    return this.appService.delete(user_id);
  }

  @Post('logout')
  async logout(@Req() req) {
    // console.log(req.headers, req, '<<----');
    const accessToken = req.headers.accesstoken;
    // console.log(accessToken, req.headers.accesstoken, '-----<<');

    return this.appService.logout(accessToken);
  }
}
