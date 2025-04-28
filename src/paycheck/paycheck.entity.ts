import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Paycheck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  payee: string;

  @Column({ type: 'timestamp' })
  date: string;
}
