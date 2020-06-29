const config = require('../../config');


// Log errors
const logErrors = (err, req, res, next) => {
  console.error(`ERROR -> ${err.stack}`);
  next(err);
};

// Catch errors for AJAX request
const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).json({ err: err.message })
  } else {
    next(err);
  }
};

// Catch errors while streaming
const errorHandler = (err, req, res, next) => {
  if (req.headersSent) {
    next(err);
  }

  if (!config.env.dev) {
    delete err.stack;
  }

  res.status(err.status || 500);
  res.render('error', { error: err });
};


module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
};
