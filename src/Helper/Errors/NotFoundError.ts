import BaseErrorClass from './BaseErrorClass';

class NotFoundError extends BaseErrorClass {
  code: string;
  constructor(message: string, code = 404) {
    super(message, code);
    this.code = 'Not Found';
  }
}
export default NotFoundError;
