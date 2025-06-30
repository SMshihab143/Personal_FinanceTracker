import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/entity/user.entity';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountType: 'checking' | 'savings' | 'credit';

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  syncStatus: 'synced' | 'error' | 'pending';

  @Column({ nullable: true })
  errorMessage: string;

  @Column({ default: 'daily' })
  syncFrequency: 'daily' | 'weekly' | 'monthly';

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  user: User;
}
