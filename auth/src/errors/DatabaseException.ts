import { CustomError } from './CustomError';

export default class DatabaseException extends CustomError {
  statusCode = 500;

  private msg: string;

  constructor(msg: string) {
    super();
    Object.setPrototypeOf(this, DatabaseException.prototype);

    this.msg = msg;
  }

  serializeErrors() {
    return [{ message: this.msg }];
  }
}
