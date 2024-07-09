import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enumerations/user.enum';
import AWSResourceService, { DataToSaveAWS } from '../aws/awsResourse.service';
import UserDTO from './dto/user.dto';
import CreateUserDTO from './dto/create-user.dto';
import { Supplier } from '../supplier/supplier.entity';
import { Service } from '../service/service.entity';
import { Client } from '../client/client.entity';
import { ClientDTO } from '../client/dto/client.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly emailSenderService: EmailSenderService,
    private readonly aWSResourceService: AWSResourceService,
  ) { }

  async create(userDto: CreateUserDTO): Promise<User> {
    if (!userDto.password) {
      throw new BadRequestException('Password is required');
    }
  
    const existingUser = await this.userRepository.findOne({ where: { email: userDto.email } });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const newUser = new User();
    Object.assign(newUser,userDto);
    newUser.createdBy = userDto.firstName;
    newUser.createdDate = new Date();
    newUser.activated = true ;
    newUser.password = await bcrypt.hash(userDto.password,10);
    return this.userRepository.save(newUser);
  }


  async createSocialUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    const newClient = new ClientDTO();
    newUser.client = newClient;
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }


  async getImageUrlFromNewImage(entity): Promise<string> {

    const dataToSave: DataToSaveAWS = {
      attach: entity.attachImage,
      idUser: entity.id,
      keyBucket: 'userProfileImages',
    };


    try {
      const attachImagesProfileUrl = await this.aWSResourceService.awsSaveProfileImage(dataToSave as DataToSaveAWS);
      return attachImagesProfileUrl

    } catch (error) {
      throw new Error(error);
    }

  }

  async updateUserById(id: string, userToUpdate: User): Promise<User> {
    try {
      userToUpdate.lastModifiedDate = new Date();
      const userUpdated = await this.userRepository.save({ id, ...userToUpdate as unknown as UserDTO })
      return userUpdated;
    } catch (error) {
      throw new Error(error)
    }
  }

}
