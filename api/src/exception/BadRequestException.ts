import { AppError } from './AppError';

export class BadRequestException extends AppError {
  constructor(public message: string) {
    super(message, 400);
  }
}
