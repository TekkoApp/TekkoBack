import UserDTO from "./../../user/dto/user.dto";
import BaseDTO from "./../../base/dto/base.dto"
import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { LocationDTO } from "./../../location/dto/location.dto";
import DeliveryDTO from "./../../delivery/dto/delivery.dto";
import AssistantDTO from "./../../assistant/dto/assistant.dto";
import { ServiceDTO } from "./../../service/dto/service.dto";
import { Weekday } from "../enums/weekDay.enum";

export class SupplierDTO extends BaseDTO {
    user: UserDTO;

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

    @IsArray()
    @IsOptional()
    workingDays: Weekday[];

    @IsString()
    @IsOptional()
    selfDescription: string;

    @IsNumberString()
    @IsOptional()
    estimatedFee: string;

}
