import { LocationDTO } from "./../../location/dto/location.dto";
import UserDTO from "./../../user/dto/user.dto";
import DeliveryDTO from "./../../delivery/dto/delivery.dto";
import BaseDTO from "./../../base/dto/base.dto";
import { IsArray, IsOptional, IsString } from "class-validator";

export class ClientDTO extends BaseDTO{

    @IsOptional()
    @IsString()
    photoUrl: string;

    @IsArray()
    address: LocationDTO[];

    @IsArray()
    deliveries: DeliveryDTO[];
}