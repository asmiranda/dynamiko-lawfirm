require('rootpath')();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');

const authRouter = require('./routes/auth');
const genericRouter = require('./routes/generic');
const pgenericRouter = require('./routes/pgeneric');
const testRouter = require('./routes/test');
const utilsRouter = require('./routes/utils');

const fileUpload = require('express-fileupload');
const app = express();


const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Dynamiko API',
      description: 'Dynamiko API',
      contact: {
        name: "Alex Miranda"
      },
      servers: ["http://dynamikosoft.com:8701"]
    }
  },
  apis: ["./routes/auth.js", "./routes/generic.js", "./routes/pgeneric.js", "./routes/test.js", "./routes/utils.js"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
app.use(fileUpload());

app.use('/api/auth', authRouter);
app.use('/api/generic', genericRouter);
app.use('/api/pgeneric', pgenericRouter);
app.use('/api/test', testRouter);
app.use('/api/utils', utilsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
