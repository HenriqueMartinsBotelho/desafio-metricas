import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('churn_rate')
export class ChurnRateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  mes: string;

  @Column({ name: 'churnrate', type: 'decimal' })
  churnRate: number;
}
