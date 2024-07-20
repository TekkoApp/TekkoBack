import {  Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "../base/base.entity";
import { Supplier } from "../supplier/supplier.entity";


@Entity('assistant')
export class Assistant extends BaseEntity{
    
    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'background_url', nullable: true })
    backgroundUrl: string;

    @ManyToOne(type => Supplier, other => other.assistants)
    @JoinColumn()
    supplier: Supplier;
}
