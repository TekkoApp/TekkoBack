import { Injectable } from '@nestjs/common';
import {  CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  create(createSupplierDTO: CreateSupplierDTO) {
    return 'This action adds a new supplier';
  }

  findAll() {
    return `This action returns all supplier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateDeliveryDto: UpdateSupplierDTO) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
