<template>
	<v-row justify="center">
		<v-dialog
			v-model="dialog"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
			dark
		>
			<v-card class="rounded-0">
				<v-toolbar
					dark
				>
					<v-btn
						icon
						dark
						@click="dialog = false"
					>
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title>Start New Order</v-toolbar-title>
					<v-spacer />
					<v-toolbar-items>
						<v-btn
							dark
							text
							@click="saveOrder"
						>
							Save
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-card flat
					class="mx-auto mt-4"
					max-width="1000"
				>
					<v-row class="ma-0 pa-0"
						justify="center" align="center"
					>
						<v-col cols="12"
							class="form-group-heading"
						>
							Menu Item Information
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="name"
								v-model="order.custom_contact"
								dense
								label="Contact (*)"
								filled
								clearable
								prepend-inner-icon="title"
								hide-details="auto"
								error-messages=""
							/>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="name"
								v-model="order.custom_location"
								dense
								label="Location (*)"
								filled
								clearable
								prepend-inner-icon="title"
								hide-details="auto"
								error-messages=""
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
export default {
	name: "StartOrderByAdminFormDialog",
	data: () => ({
		dialog: false,
		notifications: false,
		sound: true,
		widgets: false,
		order: {
			custom_contact: null,
			custom_location: null
		}
	}),
	created() {
		this.$bus.on("start-order-admin", this.openDialog)
	},
	beforeUnmount() {
		this.$bus.on("start-order-admin", this.openDialog)
	},
	methods: {
		openDialog() {
			this.dialog = true
		},
		closeDialog() {
			this.dialog = false
		},
		saveOrder() {
			this.closeDialog()
		}
	}
}
</script>
<style scoped lang="scss">
.form-group-heading {
	font-weight: 500;
	background-color: rgba(86, 86, 86, 0.4);
	border-radius: 10px;
	margin: 10px 0 7px 0;
}
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
th[role='columnheader'] span {
	font-weight: bold !important;
}
</style>
