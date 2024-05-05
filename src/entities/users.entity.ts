import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  // JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Company } from './company.entity';
import { Employees } from './employees.entity';
import { Coworking } from './coworking.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  lastname: string;

  @Column({ type: 'varchar', length: 20 })
  identification: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  // @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    name: 'activation_date',
    type: 'timestamptz',
    nullable: true,
  })
  activationDate: Date;

  @Column({
    name: 'recovery_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  recoveryToken: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // @OneToOne(() => Company, (company) => company.user, { nullable: true })
  // @JoinColumn()
  // company: Company;

  @OneToOne(() => Employees, (employee) => employee.user, { nullable: true })
  employee: Employees;

  @ManyToMany(() => Coworking, (coworking) => coworking.user, {
    nullable: true,
  })
  coworkings: Coworking[];
}
