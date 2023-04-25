import mysql from 'mysql2/promise'

interface Options {
    query: string
    values?: any[]
}

const pool = mysql.createPool({
	host: 'localhost',
	user: 'qh',
	database: 'qh',
	password: 'WUnif8D55]p*k4BZ'
})

export const sql = async ({ query, values }: Options) => {
	const [rows] = await pool.query(query, values)
	return rows
}