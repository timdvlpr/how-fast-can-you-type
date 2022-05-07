import * as express from 'express';
import { AppDataSource } from './data-source';

const app = express();
const PORT = 5000;
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to database');
  } catch (e: unknown) {
    console.log('Error occurred while connecting to database: ', e);
  }
})();
