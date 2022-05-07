import { AppError } from './AppError';

export class ConflictException extends AppError {
  constructor(public message: string) {
    super(message, 409);
  }
}
