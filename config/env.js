import { config } from 'dotenv';
import dotenv from 'dotenv';

dotenv.config();

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5500';

config ({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { 
    PORT, NODE_ENV, 
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY,
    QSTASH_TOKEN, QSTASH_URL
} = process.env;

