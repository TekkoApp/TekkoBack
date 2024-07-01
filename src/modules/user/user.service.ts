import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enumerations/user.enum';
import AWSResourceService, {  DataToSaveAWS } from '../aws/awsResourse.service';
import UserDTO from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly emailSenderService: EmailSenderService,
    private readonly aWSResourceService: AWSResourceService,
  ) {}

  async create(user: Partial<User>,isSupplier?:boolean): Promise<User> {
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }

    // Check if the email already exists
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    if(isSupplier){
      user.role = UserRole.PROVIDER
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({ ...user, password: hashedPassword });
    newUser.createdBy = newUser.firstName;
    newUser.createdDate = new Date();
    return this.userRepository.save(newUser);
  }

  async createSocialUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
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
