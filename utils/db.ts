import { createPool } from 'mysql2/promise';

import { dbConfig } from '../config/config';

export const pool = createPool(dbConfig.dev);
