import { Controller, Post, Body, Get, Param,  Delete,  Inject, Put, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import UserDTO from './dto/user.dto';
import { REQUEST } from '@nestjs/core';
import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/updateUser.dto';
import HttpPutException from '../base/exceptions/httpPut.exception';

@Controller('users')
export class UserController {
  constructor(
      private readonly userService: UserService,
      @Inject(REQUEST)
      private readonly request: Request
    ) {}

  protected getUserFromRequest() {
    const user = this.request.user as UserDTO;
    return user;
}


  @Post('/')
  async createNewUser(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

    
  @Put('/:id')
  async update(
      @Param('id',ParseUUIDPipe) id: string,
      @Body() entity: UpdateUserDTO,
  ): Promise<any> {
      try {
          //  if (!id){
          //    entity.id = this.getUserFromRequest().id;
          //  }
          return await this.userService.updateUserById(id, entity);
      } catch (err) {
          throw new HttpPutException(err).toHttpResponse();
      }
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }



  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
