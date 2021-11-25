require('dotenv').config({ path: '../.env' })
import { Pool } from 'pg'

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jugadores_db',
  password: 'root',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
})
