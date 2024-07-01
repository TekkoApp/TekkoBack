import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import AWSResourceModule from '../aws/awsResourse.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),AWSResourceModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
