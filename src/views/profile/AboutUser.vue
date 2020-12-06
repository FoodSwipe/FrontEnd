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
						<v-list-item-action>
							<v-btn
								color="grey darken-3"
								icon
							>
								<v-icon small
									color="blue darken-2"
								>
									edit
								</v-icon>
							</v-btn>
						</v-list-item-action>
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
						<v-list-item-action>
							<v-btn
								color="grey darken-3"
								icon
							>
								<v-icon small
									color="blue darken-2"
								>
									edit
								</v-icon>
							</v-btn>
						</v-list-item-action>
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
		profileTabItems: [
			{icon: "account_circle", title: "Personal"},
			{icon: "history", title: "History"},
			{icon: "settings", title: "Settings"}
		],
		personalItems1: [
			{icon: "dns", field: "Full Name", value: "Kiran Parajuli"},
			{icon: "contact_phone", field: "Phone number", value: "9856256325"},
			{icon: "contacts", field: "Username", value: "kiranparajuli589"},
			{icon: "contact_mail", field: "Email address", value: "kiranparajuli589@gmail.com"},
			{icon: "cake", field: "Birthday", value: "2055-55-5"}
		],
		personalItems2: [
			{icon: "my_location", field: "Current City", value: "Lamachaur-16, Pokhara"},
			{icon: "explore", field: "Address", value: "Tinpiple-5, Panchkhal"},
			{icon: "toggle_on", field: "Status", value: "Active"},
			{icon: "event_note", field: "Date Joined", value: "Dec 12, 2015"},
		]
	})
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
