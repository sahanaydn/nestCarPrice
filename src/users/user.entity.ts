import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';
import { report } from 'process';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id ', this.id);
  }
}
