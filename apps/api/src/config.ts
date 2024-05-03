import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const JWT_SECRET =  process.env.JWT_SECRET || 'secret';
export const NEXT_BASE_URL = process.env.NEXT_BASE_URL || '';
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL || '';

