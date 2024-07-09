import { Entity, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import { ServiceType } from './enumerations/serviceType.enum';
import Delivery from '../delivery/delivery.entity';
import { Supplier } from '../supplier/supplier.entity';

@Entity('service')
export class Service extends BaseEntity{

  @Column({ type: 'simple-array', name: 'licenceUrl', nullable: true })
  licenceUrl?: string[];

  @Column({name:'price_per_hour', nullable: true })
  pricePerHour: number;

  @Column({name:'observations', nullable: true })
  observations: string;

  @Column({
    type: 'enum',
    enum: ServiceType,
  })
  type: ServiceType;

  @OneToMany(type => Delivery, other => other.service, { cascade: ['insert', 'update'] })
  deliveries: Delivery[];

  @ManyToOne(type => Supplier, other => other.services, { cascade: ['insert', 'update'] })
  supplier: Supplier;

}
