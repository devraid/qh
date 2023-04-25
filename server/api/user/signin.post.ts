import { defineEventHandler, readBody, H3Event, createError } from 'h3'
import { signIn } from '~/server/model/user'

export default defineEventHandler(async (event: H3Event) => {
	try {
		const body = await readBody(event)
		const result = await signIn({
			email: body.user_email,
			password: body.user_password
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
