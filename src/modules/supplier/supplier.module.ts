import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import AWSResourceModule from '../aws/awsResourse.module';
import { ZoneModule } from '../zone/zone.module';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]),AWSResourceModule,ZoneModule],
  providers: [SupplierService],
  controllers: [SupplierController],
  exports: [SupplierService],
})
export class SupplierModule {}
