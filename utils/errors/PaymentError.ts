import { ErrorCodes } from '~/types/Models';

class PaymentError extends Error {
  errorCode: ErrorCodes = '0';

  constructor(name: string, message: string, errorCode?: ErrorCodes) {
    super(message);

    this.name = name;
    this.message = message;

    if (errorCode) {
      this.errorCode = errorCode;
    }
  }

  getError() {
    return {
      name: this.name,
      message: this.message,
      errorCode: this.errorCode,
    };
  }
}

export default PaymentError;
