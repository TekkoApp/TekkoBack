import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { UserRole } from './enumerations/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ nullable: false })
  createdBy: string

  @CreateDateColumn()
  createdDate: Date

  @Column({ nullable: true })
  updatedBy: string

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date
}
