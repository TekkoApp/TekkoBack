import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { LocationDTO } from "./../../location/dto/location.dto";
import { Weekday } from "../enums/weekDay.enum";
import { ServiceDTO } from "./../../service/dto/service.dto";
import CreateAttachDTO from "src/modules/attach/dto/createAttach.dto";

export class CreateSupplierDTO {

    @IsNumberString()
    @IsNotEmpty()
    phone: string;

    @IsArray()
    @IsNotEmpty()
    address: LocationDTO[];

    @IsString()
    @IsOptional()
    backgroundUrl: CreateAttachDTO;

    @IsArray()
    @IsOptional()
    workingDays: Weekday[];

    @IsString()
    @IsOptional()
    selfDescription: string;

    @IsArray()
    services: ServiceDTO[];

    @IsNumberString()
    @IsOptional()
    estimatedFee: string;

    @IsString()
    @IsOptional()
    frontId: CreateAttachDTO;

    @IsString()
    @IsOptional()
    backId: CreateAttachDTO;

}


