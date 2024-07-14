import { IsNumber, MaxLength, MinLength } from "class-validator";


export class VerificationCodeDTO{
    @MinLength(4)
    @MaxLength(4)
    @IsNumber()
    code:number;
}