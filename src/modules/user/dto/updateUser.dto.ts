import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';
import BaseDTO from '../../base/dto/base.dto';
import CreateAttachDTO from './../../attach/dto/createAttach.dto';
import { UserRole } from '../enumerations/user.enum';
import { ClientDTO } from './../../client/dto/client.dto';
import { CreateSupplierDTO } from './../../supplier/dto/create-supplier.dto';

export default class UpdateUserDTO extends BaseDTO {

    @IsOptional()
    @IsString()
    login: string;

    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password?: string;

    @IsOptional()
    attachImage: CreateAttachDTO;

    @IsOptional()
    imageUrl?: string;

    @IsOptional()
    role?: UserRole;

    @IsOptional()
    @IsEmail()
    email?: string;

    client?:ClientDTO

    supplier?:CreateSupplierDTO
}
