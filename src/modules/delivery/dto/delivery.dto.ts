import { ClientDTO } from "./../../client/dto/client.dto";
import { DeliveryStatus } from "../enums/deliveryStatus.enum";
import BaseDTO from "./../../base/dto/base.dto";
import { SupplierDTO } from "./../../supplier/dto/supplier.dto";
import { ServiceDTO } from "./../../service/dto/service.dto";

export default class DeliveryDTO extends BaseDTO {

    status: DeliveryStatus;
    startDate: Date;
    finishDate: Date;
    price: number;
    client: ClientDTO;
    observations: string;
    attached: string[];
    supplier: SupplierDTO;
    service: ServiceDTO;
}
