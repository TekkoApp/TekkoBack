
import { SupplierDTO } from "./../../supplier/dto/supplier.dto";
import BaseDTO from "./../../base/dto/base.dto";
import { ClientDTO } from "./../../client/dto/client.dto";
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class LocationDTO extends BaseDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsOptional()
    zipCode: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    @IsNumberString()
    number: string;

    @IsString()
    @IsOptional()
    apartment: string;

    @IsString()
    @IsOptional()
    reference: string;

    @IsString()
    @IsOptional()
    latitud: string;

    @IsString()
    @IsOptional()
    longitud: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsOptional()
    client: ClientDTO;

    @IsOptional()
    supplier: SupplierDTO;

}
