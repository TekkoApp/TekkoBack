// client.entity.ts
import { Entity, OneToOne, JoinColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Location } from '../location/location.entity';
import Delivery from '../delivery/delivery.entity';
import BaseEntity from '../base/base.entity';
import { Assistant } from '../assistant/assistant.entity';
import { Service } from '../service/service.entity';
import { Weekday } from './enums/weekDay.enum';

@Entity('supplier')
export class Supplier extends BaseEntity {

    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;

    @Column({ name: 'self_description', nullable: true })
    selfDescription: string;

    @OneToMany(type => Location, other => other.supplier, { cascade: ['insert', 'update'] })
    @JoinColumn()
    address: Location[];

    @OneToMany(type => Delivery, other => other.supplier, { cascade: ['insert', 'update'] })
    @JoinColumn()
    deliveries: Delivery[];

    @Column({ name: 'background_url', nullable: true })
    backgroundUrl: string;

    @OneToMany(type => Assistant, other => other.supplier, { cascade: ['insert', 'update'] })
    @JoinColumn()
    assistants: Assistant[];

    @OneToMany(type => Service, other => other.supplier, { cascade: ['insert', 'update'] })
    services: Service[];

    @Column({
        type: 'enum',
        enum: Weekday,
        array: true,
        name: 'working_days',
        nullable: true,
    })
    workingDays: Weekday[];

    @Column({ name: 'estimated_fee', nullable: true })
    estimatedFee: string;

    @Column({ name: 'back_id', nullable: true })
    backId: string;

    @Column({ name: 'front_id', nullable: true })
    frontId: string;

}
