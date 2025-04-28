import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @Column()
  uniqueCode: string; // ✅ Add this!

  @CreateDateColumn()
  createdAt: Date;
}
