class AppError extends Error {
  statusCode: string;
  status: string;
  isOperational: Boolean;
  constructor(message: string, statusCode: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
