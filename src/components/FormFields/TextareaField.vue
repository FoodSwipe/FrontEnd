<template>
	<v-col cols="12">
		<v-textarea
			:value="value"
			auto-grow
			outlined
			clearable
			hide-details="auto"
			:hint="hint"
			:label="label.toUpperCase()"
			placeholder="Start typing"
			:error-messages="getErrorMessage"
			:prepend-inner-icon="icon"
			:counter="counter"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
		/>
	</v-col>
</template>
<script>

import FieldErrorMessage from "@/mixin/FieldErrorMessage"

export default {
	name: "TextField",
	mixins: [
		FieldErrorMessage
	],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		counter: {
			type: String,
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
		icon: {
			type: String,
			required: true
		},
		hint: {
			type: [String, null],
			required: false,
			default: null
		}
	},
	emits: ["input", "change"]
}
</script>
