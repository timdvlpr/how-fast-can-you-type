import { Request, Response } from 'express';
import { BadRequestException } from '../exception/BadRequestException';
import { germanWords } from '../data/germanWords';
import { englishWords } from '../data/englishWords';

exports.getWords = async function (req: Request, res: Response, next) {
  const language = req.params.language;

  switch (language) {
    case 'german':
      res.status(200).json({ words: germanWords });
      break;
    case 'english':
      res.status(200).json({ words: englishWords });
      break;
    default:
      return next(new BadRequestException('Language not supported'));
  }
};
