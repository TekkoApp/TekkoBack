// client.entity.ts
import { Entity, OneToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Location } from '../location/location.entity';
import Delivery from '../delivery/delivery.entity';
import BaseEntity from '../base/base.entity';

@Entity('client')
export class Client extends BaseEntity {
    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @OneToMany(type => Location, other => other.client, { cascade: ['insert', 'update'] })
    address: Location[];

    @OneToMany(type => Delivery, other => other.client, { cascade: ['insert', 'update'] })
    deliveries: Delivery[];


}
