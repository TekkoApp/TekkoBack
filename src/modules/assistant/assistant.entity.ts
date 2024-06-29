import { BaseEntity, Column } from "typeorm";

export class Assistant extends BaseEntity{
    
    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'background_url', nullable: true })
    backgroundUrl: string;

}
