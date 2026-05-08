import dotenv from 'dotenv/config';
import { client } from './src/backend/src/utils/db.js';


client.sync({ force: true });
