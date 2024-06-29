import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../base/base.entity";
import { User } from "../user/user.entity";
import { Client } from "../client/client.entity";

@Entity('location')
export class Location extends BaseEntity {
    @Column({ name: 'name',nullable:true })
    name: string;

    @Column({ name: 'phone',nullable:true })
    phone: string;

    @Column({ name: 'email',nullable:true })
    email: string;

    @Column({ name: 'street',nullable:true })
    street: string;

    @Column({ name: 'zip_code',nullable:true })
    zipCode: string;

    @Column({ name: 'state',nullable:true })
    state: string;

    @Column({ name: 'city',nullable:true })
    city: string;

    @Column({ name: 'number',nullable:true })
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
    client: Client;

}
