import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity('coworkings')
export class Coworking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  lat: string;

  @Column({ type: 'varchar', length: 50 })
  long: string;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Column({ type: 'varchar', length: 10 })
  open: string;

  @Column({ type: 'varchar', length: 10 })
  close: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'int' })
  spaces: number;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  thumbnail: string;

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

  @ManyToMany(() => Users, (user) => user.coworkings, { nullable: true })
  @JoinTable({
    name: 'users_coworkings',
    joinColumn: {
      name: 'coworking_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'user_id', // Relación con la otra entidad.
    },
  })
  user: Users[];
}
