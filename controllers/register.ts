import { RequestHandler } from 'express';
import { hash } from 'bcrypt';
import { UserRecord } from '../records/user.record';
import { RegisterData } from '../types';

export const registerController: RequestHandler = async (req, res, _next) => {
  const {
    email, name, age, password,
  } = req.body as RegisterData;

  const newUser = new UserRecord({
    email,
    name,
    age,
    password: await hash(password, 10),
  });

  const id = await newUser.save();

  res.json(id);
};
