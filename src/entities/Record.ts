import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Asset } from "./Asset";
import { Employee } from "./Employee";

@Entity()
export class Record {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @Column()
  assetId: string;

}