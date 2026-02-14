const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server xatosi';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Noto\'g\'ri ID formati';
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Bu ${field} allaqachon mavjud`;
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token yaroqsiz';
  }

  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Fayl hajmi juda katta';
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
