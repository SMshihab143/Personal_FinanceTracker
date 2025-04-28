import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RecurringIncome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;  

  @Column()
  amount: number;

  @Column()
  frequency: string; 

  @Column({ type: 'timestamp' })
  date: string;
}
