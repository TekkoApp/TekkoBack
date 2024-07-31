import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
){

}
  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }
  
  async findAll(): Promise<Service[]> {
    try {
      const services = await this.serviceRepository.findAndCount();
      return services[0];
    } catch (error) {
      throw new Error(`Error finding the services  with ${error}`   )
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
