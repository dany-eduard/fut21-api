require('dotenv').config({ path: '../.env' })
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})
