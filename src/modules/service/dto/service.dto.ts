import DeliveryDTO from "./../../delivery/dto/delivery.dto";
import { ServiceType } from "../enumerations/serviceType.enum";
import BaseDTO from "./../../base/dto/base.dto";
import { SupplierDTO } from "./../../supplier/dto/supplier.dto";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import CreateAttachDTO from "./../../attach/dto/createAttach.dto";

export class ServiceDTO extends BaseDTO{

    @IsArray()
    @IsOptional()
    licenceUrl?: string[];

    @IsNumber()
    @IsOptional()
    pricePerHour: number;

    @IsOptional()
    @IsString()
    observations: string;

    @IsEnum(ServiceType)
    @IsNotEmpty()
    type: ServiceType;

    @IsOptional()
    @IsArray()
    deliveries: DeliveryDTO[];

    @IsOptional()
    supplier: SupplierDTO;
}
