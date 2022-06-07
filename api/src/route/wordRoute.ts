import * as express from 'express';

const router = express();
const wordController = require('../controller/wordController');

router.get('/:language', wordController.getWords);

module.exports = router;
