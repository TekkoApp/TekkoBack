import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsDate } from 'class-validator';
import BaseDTO from '../../base/dto/base.dto';
import CreateAttachDTO from './../../attach/dto/createAttach.dto';
import { UserRole } from '../enumerations/user.enum';

export default class UpdateUserDTO  {

    @IsOptional()
    @IsString()
    login?: string;

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
    attachImage?: CreateAttachDTO;

    @IsOptional()
    newImageForProfile?: CreateAttachDTO;

    @IsOptional()
    role?: UserRole;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsDate()
    @IsOptional() 
    lastModifiedDate: Date;

}
