import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: Partial<User>) {
    return this.userService.create(user);
  }

  
  @Post('tekko')
  async createNewTekko(@Body() user: Partial<User>) {
    return this.userService.create(user,true);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: Partial<User>) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
