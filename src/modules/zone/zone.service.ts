import { Injectable } from '@nestjs/common';
import { CreateZoneDTO } from './dto/create-zone.dto copy';
import { Repository } from 'typeorm';
import { Zone } from './zone.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ZoneService {
    constructor(
        @InjectRepository(Zone)
        private readonly zoneRepository: Repository<Zone>,
    ){

    }
    

  async create(createZoneDto: CreateZoneDTO):Promise<Zone> {
    try {
        const zoneCreated = await this.zoneRepository.save(createZoneDto);
        return zoneCreated
    } catch (error) {
        throw new Error('Error creating the zone ')        
    }

  }

//   findAll() {
//     return `This action returns all supplier`;
//   }

  async findOne(id: string): Promise<Zone> {
    try {
      const zone = await this.zoneRepository.findOne({where:{id}});
      return zone;
    } catch (error) {
      throw new Error(`Error finding the zone with id ${id} with ${error}`   )
    }

  }

  async findAll(): Promise<Zone[]> {
    try {
      const zone = await this.zoneRepository.findAndCount();
      return zone[0];
    } catch (error) {
      throw new Error(`Error finding the zones  with ${error}`   )
    }

  }

//   update(id: number, updateDeliveryDto: UpdateSupplierDTO) {
//     return `This action updates a #${id} supplier`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} supplier`;
//   }
}
