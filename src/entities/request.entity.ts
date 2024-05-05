import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  lastname: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  identification: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  open: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  close: string;

  @Column({ type: 'varchar', length: 255 })
  website: string;

  @Column({ type: 'int', name: 'quantity_beneficiaries', nullable: true })
  quantityBeneficiaries: number;

  @Column({ type: 'int', nullable: true })
  capacity: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  message: string;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
