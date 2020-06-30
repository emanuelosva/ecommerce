const boom = require('boom');
const config = require('../../config');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

const withErrorStack = (err, stack) => {
  if (config.env.dev) return { ...err, stack }
}

// Log errors
const logErrors = (err, req, res, next) => {
  console.error(`ERROR -> ${err.stack}`);
  next(err);
};

// Add errors to boom
const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
};

// Catch errors for AJAX request or if an error ocurrs while streaming
const clientErrorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload }
  } = err;

  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack))
  } else {
    next(err);
  }
};

// Catch and render for development
const errorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload }
  } = err;

  res.status(statusCode);
  res.render('error', withErrorStack(payload, err.stack));
};


module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
};
