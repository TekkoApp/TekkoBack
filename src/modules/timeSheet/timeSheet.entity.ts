import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from './../base/base.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Weekday } from '../supplier/enums/weekDay.enum';

@Entity('time_sheet')
export default class TimeSheet extends BaseEntity {
    @Column({ name: 'day' })
    day: Weekday;

    @Column({ type: 'boolean', name: 'day_available',default:true })
    dayAvailable: boolean;

    @Column({ type: 'integer', name: 'time_from', nullable: true })
    timeFrom: number;

    @Column({ type: 'integer', name: 'time_to', nullable: true })
    timeTo: number;

    @ManyToOne(type => Supplier, other => other.timeSheets )
    @JoinColumn()
    supplier: Supplier;

}