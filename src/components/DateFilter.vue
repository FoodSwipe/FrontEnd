<template>
	<v-menu
		v-model="menu"
		dark
		transition="scale-transition"
		offset-y
		max-width="290"
		min-width="290"
		:close-on-content-click="false"
	>
		<template #activator="{ on, attrs }">
			<v-text-field
				v-model="date"
				label="Date Filter"
				prepend-inner-icon="event"
				readonly
				solo
				dense
				v-bind="attrs"
				hide-details="auto"
				clearable
				v-on="on"
			/>
		</template>
		<v-date-picker
			v-model="date"
			v-model:picker-date="date"
			type="date"
			scrollable
			multiple
			elevation="15"
		>
			<v-spacer />
			<v-btn
				text
				color="primary"
				@click="menu = false"
			>
				Cancel
			</v-btn>
			<v-btn
				text
				color="primary"
				@click="saveDate()"
			>
				OK
			</v-btn>
		</v-date-picker>
	</v-menu>
</template>
<script>
export default {
	name: "DateFilterComponent",
	props: {
		whatToFilter: {
			type: String,
			required: true,
			default: null
		}
	},
	data: () => ({
		menu: false,
		modal: false,
		date: []
	}),
	methods: {
		saveDate() {
			this.menu=false
		}
	}
}
</script>
