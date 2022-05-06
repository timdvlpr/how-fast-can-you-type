import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Highscore } from './entity/Highscore';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [Highscore],
  migrations: [],
  subscribers: []
});
