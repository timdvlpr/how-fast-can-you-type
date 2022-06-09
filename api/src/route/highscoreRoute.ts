import * as express from 'express';

const router = express();
const highscoreController = require('../controller/highscoreController');

router.get('', highscoreController.getHighscores);
router.get('/:language', highscoreController.getHighscoresOfLanguage);
router.get('/check/:language/:score', highscoreController.checkIsHighscore);
router.post('', highscoreController.saveHighscore);

module.exports = router;
