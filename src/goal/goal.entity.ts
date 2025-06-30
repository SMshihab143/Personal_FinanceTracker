import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/entity/user.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal')
  targetAmount: number;

  @Column('decimal', { default: 0 })
  currentAmount: number;

  @Column({ nullable: true })
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
isFulfilled: boolean;


  @ManyToOne(() => User, user => user.id)
  user: User;
}
