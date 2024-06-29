import { Expose } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsUUID } from 'class-validator';

export default abstract class BaseDTO {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  createdBy: string;

  @Expose()
  @IsDate()
  createdDate: Date;

  @Expose()
  @IsString()
  @IsOptional() 
  lastModifiedBy: string;

  @Expose()
  @IsDate()
  @IsOptional() 
  lastModifiedDate: Date;

  @Expose()
  @IsDate()
  @IsOptional() 
  deleteDate?: Date; 
}
