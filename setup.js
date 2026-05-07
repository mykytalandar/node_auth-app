import dotenv from 'dotenv';
import { client } from './src/backend/src/utils/db.js';

dotenv.config({ path: './src/backend/.env' });

client.sync({ force: true });
