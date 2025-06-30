import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Income } from '../../income/income.entity';
import { BankAccount } from '../../account-linking/account.entity';
import { Debt } from '../../debt/debt.entity';
import { SavingsGoal } from 'src/savings/savings.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column({ unique: true })
  nid: string;

  @Column()
  password: string;


  @Column({ length: 6, nullable: true })
  uniqueCode?: string;

  
  @Column({ default: false })
  requireUniqueCode: boolean;     


  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  resetToken: string | null;
  
  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date | null;

 

  @Column({ nullable: true, type: 'varchar' })
  profileImage: string | null;


  @OneToMany(() => Income, (income) => income.user)
  incomes: Income[];
  
  @OneToMany(() => BankAccount, (account) => account.user)
  accounts: BankAccount[];


  @OneToMany(() => Debt, (debt) => debt.user)
  debts: Debt[];

  @OneToMany(() => SavingsGoal, (goal) => goal.user)
  savingsGoals: SavingsGoal[];


}
