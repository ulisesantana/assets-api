import {Entity, Column, PrimaryGeneratedColumn, 
        CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({unique: true})
    email: string;

    @Column({default: false})
    admin: boolean;

    
}