import { IsNotEmpty } from "class-validator";

export default class CoordinateDTO {
    @IsNotEmpty()
    lat: number;
  
    @IsNotEmpty()
    lng: number;
  }
  