import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UserRecord } from '../records/user.record';
import { JWT_SECRET } from '../config/config';

export const login: RequestHandler = (req, res, _next) => {
  const user = req.user as UserRecord;

  if (!user) throw new Error('Passport dont set user data in req.user');

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '1h' },
  );
  res.cookie('auth', token, {
    // secure: true,
    signed: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  })
    .json('Login successful');
};
