import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
  public reason = 'Error connecting to database';
  public statusCode = 500;

  constructor() {
    super();

    // only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors = () => {
    return [{ message: this.reason }];
  };
}
