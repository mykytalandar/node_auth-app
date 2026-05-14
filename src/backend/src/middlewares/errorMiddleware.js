import { ApiError } from '../exeptions/api.error.js';

export const errorMiddleware = (error, req, res, next) => {
  // const statusCode = error.statusCode || 500;
  // const message = error.statusCode ? error.message : 'Server error';

  // res.status(statusCode).send({
  //   message,
  // });

  if (error instanceof ApiError) {
    res.status(error.status).send({
      message: error.message,
      errors: error.errors,
    });

    return;
  }

  if (error) {
    res.statusCode = 500;
    res.send({
      message: 'Server error',
    });
  }

  next();
};
