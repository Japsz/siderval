var express = require('express');
var path = require('path');
var connect = require('connect');
var http = require('http');

var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var faena = require('./routes/faena');
var plan = require('./routes/plan');
var dt = require('./routes/dt');
var dm = require('./routes/dm');

const ejslint = require('ejs-lint');



// view engine setup
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("usuarios"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name: 'session',
    keys: ['usuarios']
}));


app.use('/', index);
app.use('/user', users);

app.use('/plan', plan);
app.use('/gerencia', admin);
app.use('/faena', faena);
app.use('/dt', dt);
app.use('/plan', plan);
app.use('/dm', dm);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('The game starts on port ' + app.get('port'));
});