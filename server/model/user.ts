import { sql } from '~/server/db'
import { Guid } from 'guid-typescript'

export type userModel = {
    id: number
    first_name: string
    last_name: string
    email: string
    mobile: string
    password: string
    token: string
}

export const list = async () => {
	const result = await sql({
		query: 'SELECT id, first_name, last_name, email, mobile FROM user ORDER BY id ASC'
	})
	return result as userModel[]
}

export const details = async (id: string) => {
	const result = await sql({
		query: 'SELECT id, first_name, last_name, email, mobile, token FROM user WHERE id = ? LIMIT 1',
		values: [id]
	}) as any
	return result.length === 1 ? (result[0] as userModel) : null
}

export const signIn = async (data: Pick<userModel, 'email' | 'password'>) => {
	const result = await sql({
		query: 'SELECT email, token FROM user WHERE email = ? AND password = MD5(?) LIMIT 1',
		values: [data.email, data.password]
	}) as any
	return result.length === 1 ? (result[0] as userModel) : null
}

export const checkUserExists = async (email: string) => {
	const result = await sql({
		query: 'SELECT id, email FROM user WHERE email = ?',
		values: [email]
	}) as any
	return result.length === 1 ? true : false
}

export const create = async (data: Pick<userModel, 'first_name' | 'last_name' | 'email' | 'password'>) => {
	// Check if the user exists
	if (await checkUserExists(data.email) === false && data.first_name !== '' && data.last_name !== '' && data.email !== '' && data.password !== '') {
		await sql({
			query: `
                INSERT INTO user (
                    first_name,
                    last_name,
                    email,
                    password,
                    token
                ) VALUES (
                    ?,
                    ?,
                    ?,
                    MD5(?),
                    ?
                )
            `,
			values: [data.first_name, data.last_name, data.email, data.password, '' + Guid.create()]
		})
		const result = await sql({
			query: `SELECT LAST_INSERT_ID() as id`
		}) as any
		return result.length === 1 ? await details(result[0]['id']) : null
	} else {
		return null
	}
}

export const update = async (id:string, data: Pick<userModel, 'first_name' | 'last_name' | 'email' | 'password'>) => {
	await sql({
		query: `
            UPDATE user
            set
                first_name = ?,
                last_name = ?,
                email = ?,
                password = ?
            WHERE id = ?
        `,
		values: [data.first_name, data.last_name, data.email, data.password, id]
	})
	return await details(id)
}

export const remove = async (id:string) => {
	await sql({
		query: `DELETE FROM user WHERE  id = ?`,
		values: [id]
	})
	return true
}