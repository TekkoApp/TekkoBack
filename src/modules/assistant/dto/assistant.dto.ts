import { IsNumberString, IsOptional, IsString } from "class-validator";
import BaseDTO from "./../../base/dto/base.dto";
import { SupplierDTO } from "./../../supplier/dto/supplier.dto";

export default class AssistantDTO extends BaseDTO{
      
    @IsString()
    @IsOptional()
    photoUrl: string;

    @IsNumberString()
    @IsOptional()
    phone: string;

    @IsNumberString()
    @IsOptional()
    backgroundUrl: string;

    supplier:SupplierDTO
}