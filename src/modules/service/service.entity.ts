import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import { ServiceType } from './enumerations/serviceType.enum';
import Delivery from '../delivery/delivery.entity';
import { Supplier } from '../supplier/supplier.entity';

@Entity('service')
export class Service extends BaseEntity{

  @Column({name:'price_per_hour', nullable: true })
  pricePerHour: number;

  @Column({name:'observations', nullable: true })
  observations: string;

  @Column({
    type: 'enum',
    enum: ServiceType,
  })
  type: ServiceType;

  @ManyToOne(type => Delivery, other => other.service)
  delivery: Delivery;

  @OneToMany(type => Delivery, other => other.service, { cascade: ['insert', 'update'] })
  deliveries: Delivery[];

  @ManyToMany(type => Supplier, other => other.services, { cascade: ['insert', 'update'] })
  suppliers: Supplier[];


}
