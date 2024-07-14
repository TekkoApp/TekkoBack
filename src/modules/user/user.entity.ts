import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserRole } from './enumerations/user.enum';
import BaseEntity from '../base/base.entity';
import { Client } from '../client/client.entity';
import { Supplier } from '../supplier/supplier.entity';

@Entity('user')
export class User extends BaseEntity{

  @Column({name:'email', nullable: true })
  email: string;

  @Column({name:'password', nullable: true })
  password: string;

  @Column({name:'imageUrl', nullable: true })
  imageUrl: string;

  @Column({name:'first_name',nullable:true})
  firstName: string;

  @Column({name:'last_name',nullable:true})
  lastName: string;

  @Column({name:'verification_code',nullable:true})
  verificationCode: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ default: true })
  activated?: boolean;

  @OneToOne(type => Client,{ cascade: ['insert', 'update'] })
  @JoinColumn()
  client: Client;

  @OneToOne(() => Supplier, { cascade: ['insert', 'update'], nullable: true })
  @JoinColumn()
  supplier: Supplier;

}
