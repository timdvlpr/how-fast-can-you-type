import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum Language {
  GERMAN = 'german',
  ENGLISH = 'english'
}

@Entity()
export class Highscore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2
  })
  score: number;

  @Column({
    type: 'enum',
    enum: Language
  })
  language: Language;

  @Column({ unique: true, length: 25 })
  username: string;

  @CreateDateColumn()
  createdAt: Date;
}
