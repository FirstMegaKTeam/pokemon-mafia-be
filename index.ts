import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';

const PORT = 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1000,
}));

app.use(express.json());

app.listen(PORT, 'localhost', () => console.log(`Server listen on http://localhost:${PORT}`));
