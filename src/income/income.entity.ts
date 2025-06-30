import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/entity/user.entity';

export enum IncomeType {
  PAYCHECK = 'paycheck',
  RECURRING = 'recurring',
  SIDE_HUSTLE = 'sidehustle',
}

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: IncomeType })
  type: IncomeType;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  payee: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  // Remove if redundant with `type`
  // @Column({ default: false })
  // recurring: boolean;

 // income.entity.ts
@ManyToOne(() => User, (u) => u.incomes, { eager: false })
user: User;

  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
