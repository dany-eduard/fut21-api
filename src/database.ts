require('dotenv').config({ path: '../.env' })
import { Pool } from 'pg'

const connectionString = process.env.CONNECTION_STRING

export const pool = new Pool({
  connectionString
})
