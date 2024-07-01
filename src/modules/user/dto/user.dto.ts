import { IsBoolean, IsEmail, IsString } from "class-validator";
import BaseDTO from "src/modules/base/dto/base.dto";
import { UserRole } from "../enumerations/user.enum";


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

    @IsString()
    imageUrl: string;

    role:UserRole

}
