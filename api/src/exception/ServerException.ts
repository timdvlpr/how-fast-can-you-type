import { AppError } from './AppError';

export class ServerException extends AppError {
  constructor(public message: string) {
    super(message, 500);
  }
}
