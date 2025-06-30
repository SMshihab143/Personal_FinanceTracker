import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { Category } from '../category/category.entity';

@Entity()
@Unique(['user', 'category', 'month', 'year'])
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

 

  @Column()
  month: number; // 1–12

  @Column()
  year: number;

  @Column('decimal')
  amount: number; // budgeted amount

   @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
}
