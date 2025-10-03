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

export const EMAIL_PASSWORD = process.env.SMTP_PASS;
export const EMAIL_USER = process.env.SMTP_USER;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;

