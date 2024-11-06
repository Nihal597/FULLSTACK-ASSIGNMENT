import pg from 'pg'

const { Pool } = pg
 
const pool = new Pool()
 
export const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  return res
}