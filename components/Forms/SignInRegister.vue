<script lang="ts">
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
	name: 'SignInRegister',
	emits: ['close'],
	setup() {
		const user = useCookie<{ email: string; token: string }>('user')

		const { t } = useI18n()

		const initialFormData = () => ({
			user_email: '',
			user_password: '',
			register_first_name: '',
			register_last_name: '',
			register_email: '',
			register_password: '',
			register_confirm_password: '',
			register_terms_conditions: '',
		})
		const formData = reactive(initialFormData())

		const rules = computed(() => {
			return {
				user_email: {
					required: helpers.withMessage(t('required'), required),
					email: helpers.withMessage(t('invalid_email_format'), email),
				},
				user_password: {
					required: helpers.withMessage(t('required'), required),
					minLength: helpers.withMessage(t('min_length_six'), minLength(6)),
				},
				register_first_name: {
					required: helpers.withMessage(t('required'), required),
				},
				register_last_name: {
					required: helpers.withMessage(t('required'), required),
				},
				register_email: {
					required: helpers.withMessage(t('required'), required),
					email: helpers.withMessage(t('invalid_email_format'), email),
				},
				register_password: {
					required: helpers.withMessage(t('required'), required),
					minLength: helpers.withMessage(t('min_length_six'), minLength(6)),
				},
				register_confirm_password: {
					required: helpers.withMessage(t('required'), required),
					sameAs: helpers.withMessage(t('passwords_dont_match'), sameAs(formData.register_password)),
				},
				register_terms_conditions: {
					sameAs: helpers.withMessage(t('required'), sameAs(true)),
				},
			}
		})
		const v$ = useVuelidate(rules, formData)

		return { t, formData, initialFormData, v$, user }
	},
	data: function () {
		return {
			restPassword: 0,
			registrationError: '',
			signInError: '',
		}
	},
	methods: {
		resetForms() {
			const self = this
			self.signInError = ''
			self.registrationError = ''
			self.v$.$reset()
			self.restPassword = 1
			Object.assign(self.formData, self.initialFormData())
		},
		signIn() {
			const self = this
			self.v$.user_email.$touch()
			self.v$.user_password.$touch()
			if (!self.v$.user_email.$invalid && !self.v$.user_password.$invalid) {
				$fetch(`/api/user/signin`, {
					method: 'POST',
					body: self.formData,
				}).then(function (data) {
					console.log(data)
					if (data.result !== null && data.result?.token !== '' && data.result?.email !== '') {
						self.signInError = ''
						self.user = {
							email: '' + data.result.email,
							token: '' + data.result.token,
						}
						navigateTo({
							path: '/user',
						})
					} else if (data.result === null) {
						self.signInError = '' + self.t('wrong_credentials')
					} else {
						self.signInError = '' + self.t('there_was_an_error')
					}
				})
			}
		},
		register() {
			const self = this
			self.v$.register_first_name.$touch()
			self.v$.register_last_name.$touch()
			self.v$.register_email.$touch()
			self.v$.register_password.$touch()
			self.v$.register_confirm_password.$touch()
			self.v$.register_terms_conditions.$touch()
			if (
				!self.v$.register_first_name.$invalid &&
				!self.v$.register_last_name.$invalid &&
				!self.v$.register_email.$invalid &&
				!self.v$.register_password.$invalid &&
				!self.v$.register_terms_conditions.$invalid &&
				!self.v$.register_terms_conditions.$invalid
			) {
				$fetch(`/api/user/create`, {
					method: 'POST',
					body: self.formData,
				}).then(function (data) {
					if (data.result !== null && data.result?.token !== '' && data.result?.email !== '') {
						self.registrationError = ''
						self.user = {
							email: '' + data.result.email,
							token: '' + data.result.token,
						}
						navigateTo({
							path: '/user',
						})
					} else if (data.result === null) {
						self.registrationError = '' + self.t('email_taken')
					} else {
						self.registrationError = '' + self.t('there_was_an_error')
					}
				})
			}
		},
	},
}
</script>

<template>
    <div class="signin-register">
        <UIModalWrapper @close="$emit('close')">
            <div
                v-if="restPassword === 1"
                class="signin flex-1">
                <h4 class="font-avenir-next-heavy text-xl text-gray mb-3">
                    {{ t('forgot_password') }}
                </h4>
                <p class="font-avenir-next-book text-sm md:text-base text-gray w-full mb-3">
                    {{ t('enter_the_email_address') }}
                </p>
                <input
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 mb-3 appearance-none outline-none border-solid border border-gray-3 transition-colors focus:border-gray-5"
                    type="email"
                    name="email"
                    maxlength="100"
                    :placeholder="t('email')"
                    autocomplete="email"
                >
                <a
                    href="#"
                    class="font-avenir-next-book text-sm text-gray underline"
                    @click="
                        () => {
                            restPassword = 0
                        }
                    "
                >
                    { { t('back_to_sign_in') }}.
                </a>
                <div class="w-full mt-3">
                    <a
                        role="button"
                        class="inline-block bg-green-7 hover:bg-green-5 font-avenir-next-heavy text-sm md:text-base text-white uppercase px-8 pt-3 pb-2 transition-colors rounded-md"
                        @click="
                            () => {
                                restPassword = 2
                            }
                        "
                    >
                        {{ t('get_verificcation_code') }}
                    </a>
                </div>
            </div>
            <div
                v-if="restPassword === 2"
                class="signin flex-1">
                <h4 class="font-avenir-next-heavy text-xl text-gray mb-3">
                    {{ t('forgot_password') }}
                </h4>
                <p class="font-avenir-next-book text-sm md:text-base text-gray w-full mb-3">
                    Check your Email and enter the Verification Code and a New Password.
                </p>
                <input
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 mb-3 appearance-none outline-none border-solid border border-gray-3 transition-colors focus:border-gray-5"
                    type="text"
                    name="verification_code"
                    maxlength="50"
                    :placeholder="t('verification_code')"
                    autocomplete="nope"
                >
                <input
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 mb-3 appearance-none outline-none border-solid border border-gray-3 transition-colors focus:border-gray-5"
                    type="password"
                    name="password"
                    maxlength="50"
                    :placeholder="t('password')"
                    autocomplete="password"
                >
                <input
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 mb-3 appearance-none outline-none border-solid border border-gray-3 transition-colors focus:border-gray-5"
                    type="password"
                    name="re_new_password"
                    maxlength="50"
                    :placeholder="t('repeat_password')"
                    autocomplete="nope"
                >
                <a
                    href="#"
                    class="font-avenir-next-book text-sm text-gray underline"
                    @click="
                        () => {
                            restPassword = 0
                        }
                    "
                >{{ t('back_to_sign_in') }}.</a
                >
                <div class="w-full mt-3">
                    <a
                        role="button"
                        class="inline-block bg-green-7 hover:bg-green-5 font-avenir-next-heavy text-sm md:text-base text-white uppercase px-8 pt-3 pb-2 transition-colors rounded-md"
                        @click="$emit('close')"
                    >
                        {{ t('set_new_password') }}
                    </a>
                </div>
            </div>
            <div
                v-if="restPassword === 0"
                class="signin flex-1 pb-5 md:pb-0 md:pr-10 max-md:border-b md:border-r border-solid border-gray-3"
            >
                <h4 class="font-avenir-next-heavy text-xl text-gray mb-3">
                    {{ t('sign_in') }}
                </h4>
                <div
                    v-if="signInError"
                    class="error mb-3">
                    <span class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500">
                        {{ signInError }}
                    </span>
                </div>
                <input
                    v-model="formData.user_email"
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 appearance-none outline-none border-solid border border-gray-3 focus:border-gray-5 transition-colors"
                    :class="{
                        'border-green-5 focus:border-green-5': !v$.user_email.$invalid,
                    }"
                    type="text"
                    name="user_email"
                    maxlength="100"
                    spellcheck="false"
                    :placeholder="t('email')"
                    autocomplete="email"
                    @change="v$.user_email.$touch"
                    @blur="v$.user_email.$touch"
                >
                <div class="error mb-3">
                    <span
                        v-if="v$.user_email.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.user_email.$errors[0].$message }}
                    </span>
                </div>
                <input
                    v-model="formData.user_password"
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 appearance-none outline-none border-solid border border-gray-3 focus:border-gray-5 transition-colors"
                    :class="{
                        'border-green-5 focus:border-green-5': !v$.user_password.$invalid,
                    }"
                    type="password"
                    name="user_password"
                    maxlength="50"
                    spellcheck="false"
                    :placeholder="t('password')"
                    autocomplete="current-password"
                    @change="v$.user_password.$touch"
                    @blur="v$.user_password.$touch"
                >
                <div class="error mb-3">
                    <span
                        v-if="v$.user_password.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.user_password.$errors[0].$message }}
                    </span>
                </div>
                <a
                    href="#"
                    class="font-avenir-next-book text-sm text-gray underline"
                    @click="resetForms()"
                >{{ t('forgot_password') }} {{ t('click_here') }}.</a
                >
                <div class="w-full mt-3">
                    <a
                        role="button"
                        class="inline-block bg-green-7 hover:bg-green-5 font-avenir-next-heavy text-sm md:text-base text-white uppercase px-8 pt-3 pb-2 transition-colors rounded-md"
                        @click="signIn()"
                    >
                        {{ t('sign_in') }}
                    </a>
                </div>
            </div>
            <div
                v-if="restPassword === 0"
                class="register flex-1 pt-5 md:pt-0 md:pl-10">
                <h4 class="font-avenir-next-heavy text-xl mb-3">
                    {{ t('register') }}
                </h4>
                <div
                    v-if="registrationError"
                    class="error mb-3">
                    <span class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500">
                        {{ registrationError }}
                    </span>
                </div>
                <input
                    v-model="formData.register_first_name"
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 appearance-none outline-none border-solid border border-gray-3 focus:border-gray-5 transition-colors"
                    :class="{
                        'border-green-5 focus:border-green-5': !v$.register_first_name.$invalid,
                    }"
                    type="text"
                    name="register_first_name"
                    maxlength="100"
                    spellcheck="false"
                    :placeholder="t('first_name')"
                    autocomplete="nope"
                    @change="v$.register_first_name.$touch"
                    @blur="v$.register_first_name.$touch"
                >
                <div class="error mb-3">
                    <span
                        v-if="v$.register_first_name.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.register_first_name.$errors[0].$message }}
                    </span>
                </div>
                <input
                    v-model="formData.register_last_name"
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 appearance-none outline-none border-solid border border-gray-3 focus:border-gray-5 transition-colors"
                    :class="{
                        'border-green-5 focus:border-green-5': !v$.register_last_name.$invalid,
                    }"
                    type="text"
                    name="register_last_name"
                    maxlength="100"
                    spellcheck="false"
                    :placeholder="t('last_name')"
                    autocomplete="nope"
                    @change="v$.register_last_name.$touch"
                    @blur="v$.register_last_name.$touch"
                >
                <div class="error mb-3">
                    <span
                        v-if="v$.register_last_name.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.register_last_name.$errors[0].$message }}
                    </span>
                </div>
                <input
                    v-model="formData.register_email"
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 appearance-none outline-none border-solid border border-gray-3 focus:border-gray-5 transition-colors"
                    :class="{
                        'border-green-5 focus:border-green-5': !v$.register_email.$invalid,
                    }"
                    type="text"
                    name="register_email"
                    maxlength="100"
                    spellcheck="false"
                    :placeholder="t('email')"
                    autocomplete="nope"
                    @change="v$.register_email.$touch"
                    @blur="v$.register_email.$touch"
                >
                <div class="error mb-3">
                    <span
                        v-if="v$.register_email.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.register_email.$errors[0].$message }}
                    </span>
                </div>
                <input
                    v-model="formData.register_password"
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 appearance-none outline-none border-solid border border-gray-3 focus:border-gray-5 transition-colors"
                    :class="{
                        'border-green-5 focus:border-green-5': !v$.register_password.$invalid,
                    }"
                    type="password"
                    name="register_password"
                    maxlength="50"
                    spellcheck="false"
                    :placeholder="t('password')"
                    autocomplete="nope"
                    @change="v$.register_password.$touch"
                    @blur="v$.register_password.$touch"
                >
                <div class="error mb-3">
                    <span
                        v-if="v$.register_password.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.register_password.$errors[0].$message }}
                    </span>
                </div>
                <input
                    v-model="formData.register_confirm_password"
                    class="font-avenir-next-book text-sm md:text-base text-gray w-full px-2 py-1 md:px-3 md:py-2 appearance-none outline-none border-solid border border-gray-3 focus:border-gray-5 transition-colors"
                    :class="{
                        'border-green-5 focus:border-green-5': !v$.register_confirm_password.$invalid,
                    }"
                    type="password"
                    name="register_confirm_password"
                    maxlength="50"
                    spellcheck="false"
                    :placeholder="t('repeat_password')"
                    autocomplete="nope"
                    @change="v$.register_confirm_password.$touch"
                    @blur="v$.register_confirm_password.$touch"
                >
                <div class="error mb-3">
                    <span
                        v-if="v$.register_confirm_password.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.register_confirm_password.$errors[0].$message }}
                    </span>
                </div>
                <div class="flex items-center mb-3">
                    <input
                        v-model="formData.register_terms_conditions"
                        name="register_terms_conditions"
                        type="checkbox"
                        class="appearance-none w-5 h-5 cursor-pointer outline-none border-solid border border-gray-3 bg-center bg-no-repeat bg-contain bg-transparent checked:bg-[url('/assets/icons/checkbox.svg')] checked:bg-green-5 checked:border-green-5 h-4 w-4"
                        @change="v$.register_terms_conditions.$touch"
                    >
                    <label
                        for="register_terms_conditions"
                        class="font-avenir-next-book text-sm text-gray ml-3"
                    >I agree to the
                        <a
                            href="#"
                            class="font-avenir-next-book text-sm text-gray underline">terms and conditions</a>
                    </label>
                </div>
                <div class="error mb-3">
                    <span
                        v-if="v$.register_terms_conditions.$error"
                        class="inline-block w-full mt-1 font-avenir-next-book text-sm text-gray text-red-500"
                    >
                        {{ v$.register_terms_conditions.$errors[0].$message }}
                    </span>
                </div>
                <a
                    role="button"
                    class="inline-block bg-green-7 hover:bg-green-5 font-avenir-next-heavy text-sm md:text-base text-white uppercase px-8 pt-3 pb-2 transition-colors rounded-md"
                    @click="register()"
                >
                    {{ t('free_registration') }}
                </a>
            </div>
        </UIModalWrapper>
    </div>
</template>
