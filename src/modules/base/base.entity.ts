import { PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

export default abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    createdBy: string;

    @Column({ nullable: false })
    createdDate: Date;

    @Column({ nullable: true })
    lastModifiedBy: string;

    @Column({ nullable: true })
    lastModifiedDate: Date;

    @DeleteDateColumn({ type: 'date', name: 'delete_date', nullable: true })
    deleteDate: Date;
}
