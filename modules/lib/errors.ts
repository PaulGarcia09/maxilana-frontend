import { ErrorData, ErrorProps } from '~/types/Errors';

export class CustomError extends Error {
  code?: string;
  errors: ErrorData[];

  constructor({ message, code, errors }: ErrorProps) {
    const error: ErrorData = message ? { message, ...(code ? { code } : {}) } : errors![0];

    super(error.message);
    this.errors = message ? [error] : errors!;

    if (error.code) this.code = error.code;
  }
}

// AGREGAR CLASES DE ERROR SI SE NECESITA

export class FetcherError extends CustomError {
  status: number;

  constructor(
    options: {
      status: number;
    } & ErrorProps,
  ) {
    super(options);
    this.status = options.status;
  }
}
