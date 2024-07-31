import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDTO } from './dto/create-zone.dto copy';
import { Zone } from './zone.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @ApiOperation({ description: 'Create a new zone' })
  @Post()
  create(@Body() createSupplierDTO: CreateZoneDTO):Promise<Zone> {
    return this.zoneService.create(createSupplierDTO);
  }

  @ApiOperation({ description: 'Get all zones' })
  @Get()
  getAll():Promise<Zone[]> {
    return this.zoneService.findAll();
  }
// 
}
