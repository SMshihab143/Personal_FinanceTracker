import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/entity/user.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g. Credit Card, Student Loan

  @Column('decimal')
  originalAmount: number;

  @Column('decimal')
  currentBalance: number;

  @Column('decimal')
  interestRate: number; // % per year

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.id)
  user: User;
}
