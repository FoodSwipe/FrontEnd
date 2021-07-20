<template>
	<v-row class="ma-0 pa-0">
		<v-col cols="12"
			class="ma-0 pa-0"
		>
			<v-card-title>Manage your profile</v-card-title>
		</v-col>
		<v-col id="top-info-column-1"
			cols="12"
			xl="6"
			lg="6"
			md="6"
			sm="6"
			class="ma-0 pa-0"
		>
			<v-list two-line
				color="transparent"
			>
				<v-list-item-group
					v-for="(item, index) in personalItems1"
					:key="index"
				>
					<v-list-item>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title class="field-value">
								{{ item.value }}
							</v-list-item-title>
							<v-list-item-subtitle class="field-title">
								{{ item.field }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-col>
		<v-col id="top-info-column-2"
			cols="12"
			xl="6"
			lg="6"
			md="6"
			sm="6"
			class="ma-0 pa-0"
		>
			<v-list two-line
				color="transparent"
			>
				<v-list-item-group
					v-for="(item, index) in personalItems2"
					:key="index"
				>
					<v-list-item>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>
								{{ item.value }}
							</v-list-item-title>
							<v-list-item-subtitle>
								{{ item.field }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: "AboutUserView",
	data: () => ({
		currentUser: null,
		isLoading: false,
	}),
	computed: {
		profileTabItems() {
			return [
				{
					icon: "account_circle",
					title: "Personal"
				},
				{
					icon: "history",
					title: "History"
				},
				{
					icon: "settings",
					title: "Settings"
				}
			]
		},
		personalItems1() {
			if (!this.currentUser) return []
			else return [
				{icon: "dns", field: "Full Name", value: this.currentUser.profile.full_name},
				{icon: "contact_phone", field: "Phone number", value: this.currentUser.profile.contact},
				{icon: "contacts", field: "Username", value: this.currentUser.username},
				{icon: "contact_mail", field: "Email address", value: this.currentUser.email},
			]
		},
		personalItems2() {
			if (!this.currentUser) return []
			else return [
				{icon: "cake", field: "Birthday", value: this.currentUser.profile.birth_date},
				{icon: "explore", field: "Address", value: this.currentUser.profile.address},
				{icon: "toggle_on", field: "Status", value: true},
				{icon: "event_note", field: "Date Joined", value: this.currentUser.date_joined},
			]
		}
	},
	created() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.isLoading = true
			this.currentUser = this.$helper.getCurrentUser()
			this.isLoading = false
		},
	}
}
</script>
<style lang="scss" scoped>
::v-deep.v-list-item__title {
	white-space: normal;
}
::v-deep.v-list-item__subtitle {
	white-space: normal;
}
</style>
