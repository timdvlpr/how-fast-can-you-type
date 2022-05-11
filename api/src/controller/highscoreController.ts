import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Highscore, Language } from '../entity/Highscore';
import { BadRequestException } from '../exception/BadRequestException';
import { ConflictException } from '../exception/ConflictException';
import { ServerException } from '../exception/ServerException';

exports.getHighscores = async function (req: Request, res: Response, next) {
  const take = Number(req.query.take) || 20;
  const skip = Number(req.query.skip) || 0;
  const repository = AppDataSource.getRepository(Highscore);
  try {
    const [result, total] = await repository.findAndCount({
      order: { score: 'DESC' },
      take: take,
      skip: skip
    });
    res.status(200).json({ data: result, count: total });
  } catch (e) {
    return next(new ServerException(e.message));
  }
};

exports.getHighscoresOfLanguage = async function (
  req: Request,
  res: Response,
  next
) {
  const language = req.params.language as Language;
  const take = Number(req.query.take) || 20;
  const skip = Number(req.query.skip) || 0;
  const repository = AppDataSource.getRepository(Highscore);

  if (!Object.values(Language).includes(language)) {
    return next(new BadRequestException('Language not supported'));
  }

  try {
    const [scores, total] = await repository.findAndCount({
      where: { language },
      order: { score: 'DESC' },
      take,
      skip
    });
    res.status(200).json({ data: scores, count: total });
  } catch (e) {
    return next(new ServerException(e.message));
  }
};

exports.saveHighscore = async function (req: Request, res: Response, next) {
  if (!req.body.score || !req.body.username || !req.body.language) {
    return next(new BadRequestException('Not all necessary values provided'));
  }
  if (req.body.username.length > 25) {
    return next(new BadRequestException('Username is too long'));
  }

  const highscore = new Highscore();
  highscore.score = req.body.score;
  highscore.username = req.body.username;
  highscore.language = req.body.language;

  const repository = AppDataSource.getRepository(Highscore);
  try {
    const scores = await repository.findBy({ language: highscore.language });

    let lowestScore = new Highscore();
    if (scores.length === 0) {
      lowestScore.score = 0;
    }
    lowestScore = scores[0];
    for (let i = 1; i < scores.length; i++) {
      if (Number(scores[i].score) < Number(lowestScore.score)) {
        lowestScore = scores[i];
      }
    }

    if (highscore.score <= lowestScore.score) {
      return next(new BadRequestException('Score too low for leaderboard'));
    }
    if (scores.length >= 100) {
      await repository.delete(lowestScore.id);
    }
    if (highscore.score > lowestScore.score || scores.length < 100) {
      const result = await repository.insert(highscore);
      res.status(201).json({ data: result.identifiers });
    }
  } catch (e) {
    switch (e.code) {
      case '23505':
        return next(
          new ConflictException('Username already listed on leaderboard')
        );
      case '22P02':
        return next(new BadRequestException('Language not supported'));
      default:
        return next(new ServerException(e.message));
    }
  }
};
