import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";
import BaseDTO from "./../../base/dto/base.dto";
import { UserRole } from "../enumerations/user.enum";
import { ClientDTO } from "./../../client/dto/client.dto";
import { SupplierDTO } from "./../../supplier/dto/supplier.dto";


export default class UserDTO extends BaseDTO  {

    @IsString()
    id: string;

    @IsString()
    login: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsBoolean()
    activated?: boolean;

    @IsString()
    password: string;

    @IsNumber()
    verificationCode: number;

    @IsString()
    imageUrl: string;

    role:UserRole;

    client: ClientDTO;

    supplier:SupplierDTO

}
