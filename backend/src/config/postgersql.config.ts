import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  host: process.env.SB_HOST!,
  port: parseInt(process.env.SB_PORT!),
  user: process.env.SB_USER!,
  password: process.env.SB_PASSWORD!,
  database: process.env.SB_DATABASE!  
});