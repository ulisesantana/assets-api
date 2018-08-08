import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, ManyToOne
} from "typeorm";
import { Asset } from "./Asset";

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