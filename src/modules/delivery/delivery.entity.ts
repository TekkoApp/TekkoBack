import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "../base/base.entity";
import { DeliveryStatus } from "./enums/deliveryStatus.enum";
import { Client } from "../client/client.entity";
import { Supplier } from "../supplier/supplier.entity";
import { Service } from "../service/service.entity";

@Entity('delivery')
export default class Delivery extends BaseEntity {

    @Column({ type: 'simple-enum', name: 'status', enum: DeliveryStatus })
    status: DeliveryStatus;

    @Column({ name: 'start_hour', nullable: true })
    startDate: Date;

    @Column({ name: 'finish_hour', nullable: true })
    finishDate: Date;

    @Column({ type: 'numeric', name: 'cost', nullable: true })
    price: number;

    @ManyToOne(type => Client, other => other.deliveries, { cascade: ['insert', 'update', 'remove'] })
    client: Client;

    @Column({ name: 'observations', nullable: true })
    observations: string;

    @Column({ type: 'simple-array', name: 'attached', nullable: true })
    attached: string[];

    @ManyToOne(type => Supplier, other => other.deliveries, { cascade: ['insert', 'update', 'remove'] })
    @JoinColumn()
    supplier: Supplier;

    @ManyToOne(type => Service, other => other.deliveries, { cascade: ['insert', 'update'] })
    @JoinColumn()
    service: Service;
}
