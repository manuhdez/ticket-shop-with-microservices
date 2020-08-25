import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    // only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(({ msg, param }) => {
      return { message: msg, field: param };
    });
  }
}
