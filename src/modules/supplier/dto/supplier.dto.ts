import BaseDTO from "./../../base/dto/base.dto"
import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { LocationDTO } from "./../../location/dto/location.dto";
import DeliveryDTO from "./../../delivery/dto/delivery.dto";
import AssistantDTO from "./../../assistant/dto/assistant.dto";
import { ServiceDTO } from "./../../service/dto/service.dto";
import Gender from "../enums/gender.enum";
import { ZoneDTO } from "./../../zone/dto/zone.dto";
import TimeSheetDTO from "./../../timeSheet/dto/timeSheet.dto";

export class SupplierDTO extends BaseDTO {

    @IsString()
    @IsOptional()
    photoUrl: string;

    @IsNumberString()
    @IsNotEmpty()
    phone: string;

    @IsArray()
    @IsNotEmpty()
    address: LocationDTO[];

    @IsArray()
    @IsOptional()
    deliveries: DeliveryDTO[];

    @IsString()
    @IsOptional()
    backgroundUrl: string;

    @IsArray()
    assistants: AssistantDTO[];

    @IsArray()
    services: ServiceDTO[];

    @IsString()
    @IsOptional()
    selfDescription: string;

    @IsNumberString()
    @IsOptional()
    estimatedFee: string;

    @IsString()
    @IsOptional()
    frontId: string;

    @IsString()
    @IsOptional()
    backId: string;

    @IsNotEmpty()
    gender:Gender

    @IsNotEmpty()
    zones: ZoneDTO[];

    timeSheets:TimeSheetDTO[]

}
