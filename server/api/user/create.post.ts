import { defineEventHandler, readBody, H3Event, createError } from 'h3'
import { create } from '~/server/model/user'

export default defineEventHandler(async (event: H3Event) => {
	try {
		const body = await readBody(event)
		const result = await create({
			first_name: body.register_first_name,
			last_name: body.register_last_name,
			email: body.register_email,
			password: body.register_password
		})

		return {
			result: result
		}
	} catch(e) {
		throw createError({
			statusCode: 500,
			statusMessage: '' + e
		})
	}
})
