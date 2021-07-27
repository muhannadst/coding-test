import BaseErrorClass from './BaseErrorClass';

class BadRequestError extends BaseErrorClass {
  code: string;
  constructor(message: string, code = 401) {
    super(message, code);
    this.code = 'Bad Request';
  }
}
export default BadRequestError;
