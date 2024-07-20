import { Injectable } from '@nestjs/common';
import { CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';
import AWSResourceService, { DataToSaveAWS } from '../aws/awsResourse.service';
import { ServiceDTO } from '../service/dto/service.dto';
import { ZoneService } from '../zone/zone.service';
import { IOptions } from '../base/enumerations/data-type';
import TimeSheetDTO from '../timeSheet/dto/timeSheet.dto';
import { UserRole } from '../user/enumerations/user.enum';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    private readonly awsResourseService: AWSResourceService,
    private readonly zoneService: ZoneService,


  ) {

  }

  create(createSupplierDTO: CreateSupplierDTO) {
    return 'This action adds a new supplier';
  }

  findAll() {
    return `This action returns all supplier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDTO) {
    const relationsForOptions: IOptions = {
      where: {
        id
      },
      relations: ['services','timeSheets','zones']
    }
    try {
      const supplierToUpdate = await this.supplierRepository.findOne(relationsForOptions);

      if (updateSupplierDto.selfDescription) {
        supplierToUpdate.selfDescription = updateSupplierDto.selfDescription
      }

      if (updateSupplierDto.estimatedFee) {
        supplierToUpdate.estimatedFee = updateSupplierDto.estimatedFee
      }


      //Actualizo las zonas del proveedor
      if (updateSupplierDto.zonesIds) {
        updateSupplierDto.zonesIds.forEach(async eachZoneId => {
          const zone = await this.zoneService.findOne(eachZoneId);
          if (supplierToUpdate.zones) {
            supplierToUpdate.zones.push(zone);
          } else {
            supplierToUpdate.zones = [zone]
          }
        });
      }


      //Guardo las imagenes de los documentos en AWS y actualizo la entidad
      if (updateSupplierDto.backId && updateSupplierDto.frontId) {
        const dataToSaveAwsBackUrl: DataToSaveAWS = {
          attach: [updateSupplierDto.backId],
          idUser: id,
          keyBucket: 'idPhotos/backId',
          rol:UserRole.PROVIDER
        }
        const dataToSaveFrontUrl: DataToSaveAWS = {
          attach: [updateSupplierDto.frontId],
          idUser: id,
          keyBucket: 'idPhotos/frontId',
          rol:UserRole.PROVIDER
        }
        supplierToUpdate.backId = await this.awsResourseService.awsSaveProfileImage(dataToSaveAwsBackUrl);
        supplierToUpdate.frontId = await this.awsResourseService.awsSaveProfileImage(dataToSaveFrontUrl);
      }

      for (const element of updateSupplierDto?.services ?? []) {
        const newService = new ServiceDTO();
        Object.assign(newService, element); // Asigna correctamente las propiedades de 'element' a 'newService'
      
        if (element.attachImages) {
         
          const licenceUrlFromAws = [];

          for (const eachAttach of element.attachImages) {
            const newDataToSave: DataToSaveAWS = {
              attach: [eachAttach],
              idUser: id,
              keyBucket: 'licenceUrl',
              rol: UserRole.PROVIDER
            };
            const urlFromAws = await this.awsResourseService.awsSaveProfileImage(newDataToSave);
            licenceUrlFromAws.push(urlFromAws);
          }

          newService.licenceUrl = licenceUrlFromAws

        }
      
        if (supplierToUpdate.services) {
          supplierToUpdate.services.push(newService);
        } else {
          supplierToUpdate.services = [newService];
        }
      }


      updateSupplierDto.timeSheets?.forEach(async eachTimeSheet => {
        const newTimeSheet = new TimeSheetDTO();
        Object.assign(newTimeSheet, eachTimeSheet);
        if (supplierToUpdate.timeSheets) {
          supplierToUpdate.timeSheets.push(newTimeSheet)
        } else {
          supplierToUpdate.timeSheets = [newTimeSheet]
        }
      })

      try {
        const supplierReUpdated = await this.supplierRepository.save({ id, ...supplierToUpdate })
        return supplierReUpdated

      } catch (error) {
        throw new Error(`Error updating supplier with ${id} with ${error}`)
      }

    } catch (error) {
      throw new Error(`Error fetching for the supplier ${error}`)
    }

  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
