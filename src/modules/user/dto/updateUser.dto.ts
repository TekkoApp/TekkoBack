import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsDate, IsBoolean } from 'class-validator';
import BaseDTO from '../../base/dto/base.dto';
import CreateAttachDTO from './../../attach/dto/createAttach.dto';
import { UserRole } from '../enumerations/user.enum';
import { ClientDTO } from './../../client/dto/client.dto';
import { Transform, Type } from 'class-transformer';

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
    @Type(() => Date)
    @Transform(({ value }) => value ?? new Date(), { toClassOnly: true })
    lastModifiedDate?: Date;

    @IsOptional()
    client?:ClientDTO

    @IsOptional()
    @IsBoolean()
    activated?:boolean

}
