import { Router } from 'express';
import { registerController } from '../controllers/register-controller';

export const registerRouter = Router();

registerRouter
    .post('/', registerController);
