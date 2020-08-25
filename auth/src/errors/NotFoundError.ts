import { CustomError } from './CustomError';

export default class NotFoundError extends CustomError {
  statusCode = 400;

  private msg: string = `The route can't be found.`;

  constructor(msg?: string) {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);

    if (msg) {
      this.msg = msg;
    }
  }

  serializeErrors() {
    return [{ message: this.msg }];
  }
}
