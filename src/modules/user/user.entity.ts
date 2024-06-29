import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { UserRole } from './enumerations/user.enum';
import BaseEntity from '../base/base.entity';
import { Location } from '../location/location.entity';

@Entity('user')
export class User extends BaseEntity{

  @Column({name:'email', nullable: true })
  email: string;

  @Column({name:'password', nullable: true })
  password: string;

  @Column({name:'first_name',nullable:true})
  firstName: string;

  @Column({name:'last_name',nullable:true})
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ default: true })
  activated?: boolean;

}
