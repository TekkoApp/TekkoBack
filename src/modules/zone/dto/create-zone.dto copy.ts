import { IsString, IsArray, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import  CoordinateDTO  from './coordinate.dto';


export class CreateZoneDTO {
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


}