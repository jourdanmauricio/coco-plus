import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employees } from './employees.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @Column({ type: 'int', name: 'passes_available' })
  quantityBeneficiaries: number;

  @Column({ type: 'varchar', name: 'business_sector', length: 150 })
  businessSector: string;

  @Column({ type: 'int' })
  size: number;

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

  // @OneToOne(() => Users, (user) => user.company, { nullable: true })
  // user: Users;

  @OneToMany(() => Employees, (employee) => employee.company)
  // @JoinColumn()
  employees: Employees[];
}
