import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { LocationDTO } from "./../../location/dto/location.dto";
import { Weekday } from "../enums/weekDay.enum";
import { ServiceDTO } from "./../../service/dto/service.dto";

export class CreateSupplierDTO {

    @IsNumberString()
    @IsNotEmpty()
    phone: string;

    @IsArray()
    @IsNotEmpty()
    address: LocationDTO[];

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

}


