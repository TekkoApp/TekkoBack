import { Controller, Post, Body,  UseGuards, Request, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { GoogleLoginDto } from './dtos/googleLogin.dto';
import { FacebookLoginDto } from './dtos/facebookLogin.dto';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../user/user.entity';
import { REQUEST } from '@nestjs/core';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(REQUEST) private request: Request,

  ) {}

  @UseGuards(RolesGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }

  @Post('regularLogin')
  async regularLogin(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.loginWithEmail(email, password);
  }


  @Post('google')
  async googleLogin(@Body() body:any) {
    return this.authService.googleLogin(body.token);
  }

  @Post('facebook')
  async facebookLogin(@Body() body:FacebookLoginDto) {
    const { accessToken, userID } = body;
    return this.authService.facebookLogin(accessToken, userID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile (): Promise<User> {
    const user = await this.authService.getProfile(this.request['user']['userId']);
    return user;
   
  }
}
