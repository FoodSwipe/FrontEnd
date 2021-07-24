<template>
	<v-col
		cols="12"
	>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="itemGroup"
			:value="value"
			:items="itemGroups.results"
			:loading="itemGroupLoading"
			outlined
			clearable
			item-text="name"
			item-value="id"
			label="SELECT MENU ITEM GROUP"
			class="menu-item-group-field"
			hide-details="auto"
			prepend-inner-icon="bubble_chart"
			placeholder="Start typing"
			:error-messages="getErrorMessage"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No menu item group found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
</template>
<script>
import FieldErrorMessage from "@/mixin/FieldErrorMessage"
import MenuItemGroupAutocomplete from "@/mixin/MenuItemGroupAutocomplete"

export default {
	name: "MenuItemGroupField",
	mixins: [
		FieldErrorMessage,
		MenuItemGroupAutocomplete
	],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
	},
	emits: ["input", "change"],
	data() {
		return {
			name: "item_group"
		}
	},
}
</script>
