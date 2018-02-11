import {Entity, Column, PrimaryGeneratedColumn, 
        CreateDateColumn, UpdateDateColumn, 
        ManyToOne, OneToMany 
    } from "typeorm";
import {Employee} from "./Employee";
import {Record} from "./Record";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @Column()
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    notes: string;

    @Column({
        default: false
    })
    blocked: boolean;

    @Column({
        unique: true
    })
    serialNumber: string;

    @Column({
        default:1
    })
    @ManyToOne(type => Employee, employee => employee.assets)
    employeeId: number;
    
    @OneToMany(type => Record, record => record.assetId) 
    records: Record[];

}