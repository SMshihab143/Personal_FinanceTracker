import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/entity/user.entity';

@Entity()
export class SavingsGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  target: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  saved: number;

  @ManyToOne(() => User, user => user.savingsGoals, { onDelete: 'CASCADE' })
  user: User;
}
