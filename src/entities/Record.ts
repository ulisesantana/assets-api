import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Asset } from "./Asset";
import { Employee } from "./Employee";

@Entity()
export class Record {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({default: 1})
  fromEmployeeId: number;
  
  @Column({default: 1})
  toEmployeeId: number;
  
  @Column()
  @ManyToOne(type => Asset, asset => asset.records)
  assetId: number;
}