const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const express = require('express');
const session = require('express-session')
const app = express();
const logger = require('morgan');

/** seting up database and it's normal initializing processes */
require('./utils/db.util')

// setting up central routing of controllers 
const routes = require('./routes/api');

const errorHandler = require('./middlewares/errorHandler')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'sid',
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 360000}
  
}))

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// mixing our custom apiErrorHandler with express's default error handler
app.use(errorHandler, function(err, req, res, next) {
  // set locals, only providing error in development
  if(err.message.includes('jwt')) 
    return res.status(401).json({error: 'AUTHENTICATION', status: 401, description: err.message})
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
