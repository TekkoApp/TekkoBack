import DeliveryDTO from "./../../delivery/dto/delivery.dto";
import { ServiceType } from "../enumerations/serviceType.enum";
import BaseDTO from "./../../base/dto/base.dto";
import { SupplierDTO } from "./../../supplier/dto/supplier.dto";

export class ServiceDTO extends BaseDTO{
  licenceUrl?:string[];
  pricePerHour: number;
  observations: string;
  type: ServiceType;
  deliveries: DeliveryDTO[];
  supplier: SupplierDTO;
}
