import { Injectable } from '@nestjs/common';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDTO } from './dto/update-client.dto';
import { ClientDTO } from './dto/client.dto';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location.entity';
import { UserService } from '../user/user.service';
import UpdateUserDTO from '../user/dto/updateUser.dto';


@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly locationService: LocationService,
    private readonly userService: UserService,

  ){  

  }


  async create(createClientDTO: CreateClientDTO) {
    const newClient = new ClientDTO();
    if(createClientDTO.address){
      newClient.address = [await this.locationService.create(createClientDTO.address)]
    }
    const clientSaved = await this.clientRepository.save(newClient);
    const newUpdateUser = new UpdateUserDTO();
    newUpdateUser.client = clientSaved;
    await this.userService.updateUserById(createClientDTO.userId,newUpdateUser)
    return clientSaved;
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateDeliveryDto: UpdateClientDTO) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

}
