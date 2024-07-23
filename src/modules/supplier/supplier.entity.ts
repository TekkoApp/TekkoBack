// client.entity.ts
import { Entity,  JoinColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Location } from '../location/location.entity';
import Delivery from '../delivery/delivery.entity';
import BaseEntity from '../base/base.entity';
import { Assistant } from '../assistant/assistant.entity';
import { Service } from '../service/service.entity';
import Gender from './enums/gender.enum';
import { Zone } from '../zone/zone.entity';
import TimeSheet from '../timeSheet/timeSheet.entity';

@Entity('supplier')
export class Supplier extends BaseEntity {

    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;

    @Column({ name: 'gender', nullable: true,type:'enum',enum:Gender })
    gender: Gender;

    @Column({ name: 'self_description', nullable: true })
    selfDescription: string;

    @OneToMany(type => Location, other => other.supplier, { cascade: ['insert', 'update'] })
    address: Location[];

    @OneToMany(type => Delivery, other => other.supplier, { cascade: ['insert', 'update'] })
    deliveries: Delivery[];

    @Column({ name: 'background_url', nullable: true })
    backgroundUrl: string;

    @OneToMany(type => Assistant, other => other.supplier, { cascade: ['insert', 'update'] })
    assistants: Assistant[];

    @OneToMany(type => Service, other => other.supplier, { cascade: ['insert', 'update'] })
    services: Service[];

    @Column({ name: 'estimated_fee', nullable: true })
    estimatedFee: string;

    @Column({ name: 'back_id', nullable: true })
    backId: string;

    @Column({ name: 'front_id', nullable: true })
    frontId: string;

    @Column({ name: 'birth_date', nullable: true })
    birthDate: Date;

    @ManyToMany(type => Zone, other => other.suppliers, { cascade: ['insert', 'update'] })
    @JoinTable({
        name: 'supplier_zones',
        joinColumn: { name: 'supplier_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'zone_id', referencedColumnName: 'id' }
    })
    zones: Zone[];

    @OneToMany(type => TimeSheet, other => other.supplier, { cascade: ['insert', 'update'] })
    timeSheets: TimeSheet[];
 
}
