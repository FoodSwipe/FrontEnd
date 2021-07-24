<template>
	<v-col cols="12"
		:xl="(split) ? 6 : null"
		:lg="(split) ? 6 : null"
		:md="(split) ? 6 : null"
		:sm="(split) ? 6 : null"
	>
		<v-text-field
			:value="value"
			outlined
			clearable
			:label="label.toUpperCase()"
			placeholder="Start typing"
			:type="type"
			:hint="hint"
			:counter="counter"
			hide-details="auto"
			:error-messages="getErrorMessage"
			:prepend-inner-icon="icon"
			:autocomplete="autocomplete"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
		/>
	</v-col>
</template>
<script>

import FieldErrorMessage from "@/mixin/FieldErrorMessage"

export default {
	name: "TextField",
	mixins: [FieldErrorMessage],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		name: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true
		},
		hint: {
			type: String,
			default: null,
		},
		type: {
			type: String,
			required: false,
			default: "text"
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
		counter: {
			default: false
		},
		autocomplete: {
			type: String,
			default: "off"
		},
		split: {
			type: Boolean,
			default: false
		}
	},
	emits: ["input", "change"],
}
</script>
