import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { handleError } from './utils/handleError';
import './utils/db';
import passport from './passport/passportStrategy';
import { registerRouter } from './routers/register-router';
import { loginRouter } from './routers/login-router';
import { COOKIE_SIGN_SECRET } from './config/config';

const PORT = 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1000,
}));
app.use(cookieParser(COOKIE_SIGN_SECRET));
app.use(express.json());
app.use(passport.initialize());

// Routers
app.use('/register', registerRouter);
app.use('/login', passport.authenticate('login', { session: false, failWithError: true }), loginRouter);
// app.get('/check', passport.authenticate('userAccess', { session: false, failWithError: true }), (_req, res, _next) => {
//   res.json('work');
// });

// global handleError
app.use(handleError);

app.listen(PORT, 'localhost', () => console.log(`Server listen on http://localhost:${PORT}`));
