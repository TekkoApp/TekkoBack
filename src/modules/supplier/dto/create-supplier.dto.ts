import { IsArray, IsDate, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { LocationDTO } from "./../../location/dto/location.dto";
import CreateAttachDTO from "./../../attach/dto/createAttach.dto";
import { CreateServiceDto } from "./../../service/dto/create-service.dto";
import CreateTimeSheetDTO from "./../../timeSheet/dto/create-timeSheet.dto";
import Gender from "../enums/gender.enum";

export class CreateSupplierDTO {

    @IsNumberString()
    @IsOptional()
    phone: string;

    @IsOptional()
    gender: Gender;

    @IsDate()
    @IsOptional()
    birthDate: Date;

    @IsArray()
    @IsOptional()
    address: LocationDTO[];

    @IsString()
    @IsOptional()
    backgroundUrl: CreateAttachDTO;

    @IsString()
    @IsOptional()
    selfDescription: string;

    @IsArray()
    services: CreateServiceDto[];

    @IsNumberString()
    @IsOptional()
    estimatedFee: string;

    @IsOptional()
    frontId: CreateAttachDTO;

    @IsOptional()
    backId: CreateAttachDTO;

    @IsOptional()
    @IsArray()
    zonesIds?:string[]

    @IsOptional()
    @IsArray()
    timeSheets:CreateTimeSheetDTO[]

 
}


