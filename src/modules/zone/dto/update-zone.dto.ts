import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import CoordinateDTO from "./coordinate.dto";

export class UpdateZoneDTO {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CoordinateDTO)
    coordinates?: CoordinateDTO[];
  
    @IsOptional()
    @ValidateNested()
    @Type(() => CoordinateDTO)
    center?: CoordinateDTO;
  
    @IsOptional()
    @IsString()
    description?: string;
  }
  