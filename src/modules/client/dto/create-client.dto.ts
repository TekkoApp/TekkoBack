import CreateLocationDTO from "./../../location/dto/create-location.dto";

export class CreateClientDTO {
    address:CreateLocationDTO
    userId?: string;
}
