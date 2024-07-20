import { IsString, IsArray, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import BaseDTO from './../../base/dto/base.dto';
import { SupplierDTO } from './../../supplier/dto/supplier.dto';
import  CoordinateDTO  from './coordinate.dto';


export class ZoneDTO extends BaseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoordinateDTO)
  @IsNotEmpty()
  coordinates: CoordinateDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinateDTO)
  center?: CoordinateDTO;

  @IsOptional()
  @IsString()
  description?: string;

  suppliers:SupplierDTO[]


}