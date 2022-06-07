import * as express from 'express';
import { AppDataSource } from './data-source';

const app = express();
const PORT = 5000;
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'productionOrigin'
        : 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
);

app.use('/api/highscore', require('./route/highscoreRoute'));
app.use('/api/words', require('./route/wordRoute'));

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
