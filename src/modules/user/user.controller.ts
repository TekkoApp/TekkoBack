import { Controller, Post, Body, Get, Param,  Delete,  Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import UserDTO from './dto/user.dto';
import { REQUEST } from '@nestjs/core';
import CreateUserDTO from './dto/create-user.dto';

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
    const algo = 0;
    return this.userService.create(user);
  }

    
  // @Put('/:id')
  // async update(
  //     @Param('id') id: string,
  //     @Body() entity: UpdateUserDTO,
  // ): Promise<any> {
  //     try {
  //         entity.id = this.getUserFromRequest().id;
  //         if (entity.attachImage) {
  //             const imageUrl = await this.userService.getImageUrlFromNewImage(entity)
  //             entity.imageUrl = imageUrl;
  //         }
  //         return await this.userService.updateUserById(id, entity as UserDTO);
  //     } catch (err) {
  //         throw new HttpPutException(err).toHttpResponse();
  //     }
  // }

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
