import { PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

export default abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' }) // Usa 'CURRENT_TIMESTAMP' para obtener la fecha actual en SQL
    createdDate: Date = new Date();

    @Column({ nullable: false, default: 'system' })
    createdBy: string = 'system';
    
    @Column({ nullable: true })
    lastModifiedBy: string;

    @Column({ nullable: true })
    lastModifiedDate: Date;

    @DeleteDateColumn({ type: 'date', name: 'delete_date', nullable: true })
    deleteDate?: Date;
}
