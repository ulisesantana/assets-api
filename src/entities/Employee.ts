import {Entity, Column, PrimaryGeneratedColumn, 
        OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Asset} from "./Asset";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @Column()
    name: string;

    @OneToMany(type => Asset, asset => asset.employeeId) 
    assets: Asset[];
}