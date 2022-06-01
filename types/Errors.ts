export type ErrorData = {
  message: string;
  code?: string;
};

export type ErrorProps = {
  code?: string;
} & ({ message: string; errors?: never } | { message?: never; errors: ErrorData[] });
