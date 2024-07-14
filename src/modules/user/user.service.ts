import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import AWSResourceService, { DataToSaveAWS } from '../aws/awsResourse.service';
import UserDTO from './dto/user.dto';
import CreateUserDTO from './dto/create-user.dto';
import { ClientDTO } from '../client/dto/client.dto';
import UpdateUserDTO from './dto/updateUser.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InformationToSendForEmail } from '../mailerSend/mailerSend.service';
import { InformationForNewUserMail } from '../event-mail/event-mail.module';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
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

  

    const userSaved =  await this.userRepository.save(newUser);

    if(userDto.supplier?.services?.some((eachService=> eachService.attachImages))){
      userDto.supplier?.services?.forEach(async element => {
        if(element.attachImages){
          const newDataToSave :DataToSaveAWS ={
            attach : element.attachImages,
            idUser : userSaved.supplier.id,
            keyBucket : 'licenceUrl'
          }
          const imagesSaved = await this.aWSResourceService.awsSaveLicenceUrl(newDataToSave);
          
        }
       });
    }

    const informationToSendEmail : InformationToSendForEmail = {
       subject : 'Felicitaciones Usuario Creado',
       templateName : 'welcomeUser',
       toName: userDto.firstName,
       context:{
        name:userDto.firstName
       },
       to:userDto.email
    }

  
    this.eventEmitter.emit('user.created', informationToSendEmail);

    return userSaved;
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

  async updateUserById(id: string, userToUpdate: UpdateUserDTO): Promise<User> {
    try {
      userToUpdate.lastModifiedDate = new Date();
      if (userToUpdate.newImageForProfile){
        const dataForAws :DataToSaveAWS = {
          attach : [userToUpdate.newImageForProfile],
          idUser: id,
          rol : userToUpdate.role,
          keyBucket : 'profile'
        }
        const newImageUrl = await this.aWSResourceService.awsSaveProfileImage(dataForAws);
        userToUpdate.imageUrl = newImageUrl;
      }
      const userDataToUpdate = new UserDTO();
      Object.assign(userDataToUpdate,userToUpdate);
       await this.userRepository.save({ id, ...userDataToUpdate});
      const userAlreadyUpdated = await this.userRepository.findOne({where:{id}})
      return userAlreadyUpdated;
    } catch (error) {
      throw new Error(error)
    }
  }

}
