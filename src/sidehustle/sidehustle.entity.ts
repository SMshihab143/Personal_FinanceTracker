import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SideHustle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  clientName: string;

  @Column()
  amountEarned: number;

  @Column({ type: 'timestamp' })
  receivedDate: Date;
}
