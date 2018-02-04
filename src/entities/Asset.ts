import {Entity, Column, PrimaryGeneratedColumn, 
        CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import {Employee} from "./Employee";

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

    @Column()
    notes: string;

    @Column({default: false})
    blocked: boolean;

    @Column({unique: true})
    serialNumber: string;

    @Column({default:1})
    @ManyToOne(type => Employee, employee => employee.assets)
    employeeId: number;

}