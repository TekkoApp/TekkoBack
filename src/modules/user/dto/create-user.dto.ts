import {  IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../enumerations/user.enum";
import { ClientDTO } from "./../../client/dto/client.dto";
import { CreateSupplierDTO } from "./../../supplier/dto/create-supplier.dto";


export default class CreateUserDTO   {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    role:UserRole;

    client?: ClientDTO;

    supplier?:CreateSupplierDTO;

}