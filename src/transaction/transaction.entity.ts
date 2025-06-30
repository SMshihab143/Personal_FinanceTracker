import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'income' | 'expense';

  @Column('decimal')
  amount: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  payee: string;

  @CreateDateColumn()
  date: Date;

  @Column({ default: false })
isTaxDeductible: boolean;


  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Category, category => category.id, { nullable: true })
  category: Category;
}
