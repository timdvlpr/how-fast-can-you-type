import * as express from 'express';

const router = express();
const highscoreController = require('../controller/highscoreController');

router.get('', highscoreController.getHighscores);
router.get('/:language', highscoreController.getHighscoresOfLanguage);
router.post('', highscoreController.saveHighscore);

module.exports = router;
