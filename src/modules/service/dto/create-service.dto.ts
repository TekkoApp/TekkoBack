import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import CreateAttachDTO from "src/modules/attach/dto/createAttach.dto";
import { ServiceType } from "../enumerations/serviceType.enum";

export class CreateServiceDto {
    @IsArray()
    @IsOptional()
    attachImages: CreateAttachDTO[];

    @IsNumber()
    @IsOptional()
    pricePerHour: number;

    @IsOptional()
    @IsString()
    observations: string;

    @IsEnum(ServiceType)
    @IsNotEmpty()
    type: ServiceType;


}
