<template>
	<v-col
		cols="12"
		:xl="(split) ? 6 : null"
		:lg="(split) ? 6 : null"
		:md="(split) ? 6 : null"
		:sm="(split) ? 6 : null"
	>
		<v-select
			:value="value"
			dark
			:items="options"
			:label="label.toUpperCase()"
			hide-details="auto"
			clearable
			outlined
			attach=""
			:prepend-inner-icon="icon"
			:error-messages="getErrorMessage"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
		/>
	</v-col>
</template>

<script>
import FieldErrorMessage from "@/mixin/FieldErrorMessage"

export default {
	name: "SelectField",
	mixins: [FieldErrorMessage],
	props: {
		split: {
			type: Boolean,
			default: false
		},
		value: {
			type: [String, null],
			default: null
		},
		options: {
			type: Array,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		icon: {
			type: String,
			required: true
		}
	},
	emits: ["input", "change"],
}
</script>

<style scoped>

</style>
