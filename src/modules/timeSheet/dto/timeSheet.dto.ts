import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import BaseDTO from "./../../base/dto/base.dto";
import { SupplierDTO } from "./../../supplier/dto/supplier.dto";
import { Weekday } from "./../../supplier/enums/weekDay.enum";



export default class TimeSheetDTO extends BaseDTO {
    
    @IsNotEmpty()
    @IsString()
    day: Weekday;

    @IsNotEmpty()
    @IsBoolean()
    dayAvailable: boolean;

    @IsOptional()
    @IsNumber()
    timeFrom: number;

    @IsOptional()
    @IsNumber()
    timeTo: number;

    supplier: SupplierDTO; 

}




