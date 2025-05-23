import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import usersRouter from './src/routes/users.js';
import authRouter from './src/routes/auth.js';
import espaciosRouter from './src/routes/espacios.js';
import eventosRouter from './src/routes/eventos.js';
import reservasRouter from './src/routes/reservas.js';
import { fileURLToPath } from 'url';
import verificarToken from './src/middlewares/verificarToken.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { engine } from 'express-handlebars';

const app = express();

app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: false // esto desactiva los layouts por defecto
}));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

// TODO CONFIGURAR CORS
const allowedOrigins = new Set(['http://localhost:5173', 'http://localhost:3000']);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido'));
    }
  },
  credentials: true,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRouter);
app.use('/users', verificarToken, usersRouter);
app.use('/espacios', verificarToken, espaciosRouter);
app.use('/eventos', verificarToken, eventosRouter);
app.use('/reservas', verificarToken, reservasRouter);



app.use(function(req, res, next) {
  next(createError(404));
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

export default app;
