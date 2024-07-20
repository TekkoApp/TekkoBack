import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "../base/base.entity";
import { Client } from "../client/client.entity";
import { Supplier } from "../supplier/supplier.entity";

@Entity('location')
export class Location extends BaseEntity {
    @Column({ name: 'name',nullable:false,default:'principal' })
    name: string;

    @Column({ name: 'street',nullable:false })
    street: string;

    @Column({ name: 'zip_code',nullable:true })
    zipCode: string;

    @Column({ name: 'state',nullable:false })
    state: string;

    @Column({ name: 'city',nullable:false })
    city: string;

    @Column({ name: 'number',nullable:false })
    number: string;

    @Column({ name: 'apartment',nullable:true})
    apartment: string;

    @Column({ name: 'reference',nullable:true})
    reference: string;

    @Column({ name: 'latitud',nullable:true })
    latitud: string;

    @Column({ name: 'longitud',nullable:true })
    longitud: string;

    @Column({ name: 'country',nullable:true })
    country: string;

    @ManyToOne(type => Client, other => other.address)
    @JoinColumn()
    client: Client;

    @ManyToOne(type => Supplier, other => other.address)
    @JoinColumn()
    supplier: Supplier;

}
