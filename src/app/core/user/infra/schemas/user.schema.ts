import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '@user/domain/contracts/user.typings';

@Entity('User')
export class UserSchema {
  @PrimaryGeneratedColumn() id: number;
  @UpdateDateColumn() updatedAt: Optional<Date>;
  @Column({ unique: true }) email: string;
  @Column({ unique: true }) phone: string;
  @CreateDateColumn() createdAt: Date;
  @Column() displayName: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column() password: string;
  @Column() active: boolean;
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;
}
