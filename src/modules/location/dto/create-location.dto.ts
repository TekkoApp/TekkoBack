
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export default class CreateLocationDTO  {
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


}
