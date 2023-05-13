import type { LocaleMessage } from '@intlify/core-base'
import type { I18nOptions } from '@nuxtjs/i18n'

export default defineI18nConfig(
	async (): Promise<I18nOptions> => ({
		legacy: false,
		locale: 'en',
		fallbackLocale: 'en',
		messages: {
			en: await loadLocale('en'),
		},
	})
)

async function loadLocale(locale: string): Promise<LocaleMessage> {
	return await import(`./lang/${locale}.json`).then((module) => module.default)
}
