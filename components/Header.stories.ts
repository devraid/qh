import Header from './Header.vue'

export default {
	title: 'Header',
	component: Header,
	argTypes: {
		label: 'String',
	},
}
export const HeaderComponent = {}

const Template = (args: Record<string, any>) => ({
	components: { Header },
	setup() {
		return { args }
	},
	template: '<Header v-bind="args" />',
})

export const Rounded = Template.bind({})
