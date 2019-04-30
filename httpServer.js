const createError = require('http-errors');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
// const { logger } = require('logger');


// const {  express: expressLogger } = require('logger');

const indexRouter = require('routes/index');
// const signinRouter = require('httpRoutes/signin');
const clientRouter = require('./routes/users');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(expressLogger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: 'http://localhost:3000' }));

let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }

  next(createError(503));
});

// Routes prefix
app.use('/', indexRouter);
// app.use('/signin', signinRouter);
app.use('/users', clientRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler. Don`t remove 'next' attribute
app.use((err, req, res) => {
  // logger.warn(err);
  console.warn(err);

  const code = err.status || 500;
  res.status(code);
  res.json({ status: 'error', payload: { code } });
  res.end();
});

const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    // logger.warn('Routes already enabled');
    console.warn('Routes already enabled');
    return;
  }

  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;
