// client.entity.ts
import { Entity, OneToOne, JoinColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Location } from '../location/location.entity';
import Delivery from '../delivery/delivery.entity';
import BaseEntity from '../base/base.entity';
import { Assistant } from '../assistant/assistant.entity';
import { Service } from '../service/service.entity';

@Entity('supplier')
export class Supplier extends BaseEntity {
    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @OneToMany(type => Location, other => other.client, { cascade: ['insert', 'update'] })
    address: Location[];

    @OneToMany(type => Delivery, other => other.client, { cascade: ['insert', 'update'] })
    deliveries: Delivery[];

    @Column({ name: 'background_url', nullable: true })
    backgroundUrl: string;

    @OneToMany(type => Delivery, other => other.client, { cascade: ['insert', 'update'] })
    assistants: Assistant[];

    
    @ManyToMany(type => Service, other => other.suppliers, { cascade: ['insert', 'update'] })
    services: Service[];





}
