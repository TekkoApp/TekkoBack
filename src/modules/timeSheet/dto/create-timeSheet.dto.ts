import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export default class CreateTimeSheetDTO  {
    
    @IsNotEmpty()
    @IsString()
    day: string;

    @IsNotEmpty()
    @IsBoolean()
    dayAvailable: boolean;

    @IsOptional()
    @IsNumber()
    timeFrom: number;

    @IsOptional()
    @IsNumber()
    timeTo: number;

}



