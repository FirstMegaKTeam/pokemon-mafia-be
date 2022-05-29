import { Router } from 'express';
import { registerController } from '../controllers/register';

export const registerRouter = Router();

registerRouter
  .post('/', registerController);
