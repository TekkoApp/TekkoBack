import { Entity, Column, CreateDateColumn, UpdateDateColumn,  ManyToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import { Supplier } from '../supplier/supplier.entity';

class Coordinate {
  lat: number;
  lng: number;
}

@Entity()
export class Zone extends BaseEntity{

  @Column()
  name: string;

  @Column('jsonb')
  coordinates: Coordinate[];

  @Column('jsonb', { nullable: true })
  center?: Coordinate; 

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(type => Supplier, other => other.zones, { cascade: ['insert', 'update'] })
  suppliers: Supplier[];

}
