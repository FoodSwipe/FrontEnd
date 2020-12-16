<template>
	<div class="admin-home">
		<v-row class="ma-0 pa-0">
			<v-col cols="12"
				xl="6"
				lg="6"
				md="6"
				sm="6"
			>
				<v-card dark
					color="primary"
				>
					<v-card-title>Items summary</v-card-title>
					<v-card-text>
						<v-sheet color="rgba(0, 0, 0, .12)">
							<v-sparkline
								:value="itemSummary"
								:labels="itemSummaryLabels"
								:smooth="16"
								color="white"
								:gradient="['#f72047', '#ffd200', '#1feaea']"
								auto-draw
								auto-draw-easing="ease"
								height="100"
								padding="24"
								stroke-linecap="round"
							/>
						</v-sheet>
					</v-card-text>
					<v-card-text>
						<div class="display-1 font-weight-thin text-center">
							Sales Last Month
						</div>
					</v-card-text>

					<v-divider />

					<v-card-actions class="justify-center">
						<v-btn
							block
							text
						>
							Go to Report
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="12"
				xl="6"
				lg="6"
				md="6"
				sm="6"
			>
				<v-card dark
					color="green"
				>
					<v-card-title>Users summary</v-card-title>
					<v-card-text>
						<v-sheet color="rgba(0, 0, 0, .12)">
							<v-sparkline
								:value="userSummary"
								:labels="userSummaryLabels"
								:smooth="16"
								color="white"
								:gradient="['#f72047', '#ffd200', '#1feaea']"
								auto-draw
								auto-draw-easing="ease"
								height="100"
								padding="24"
								stroke-linecap="round"
							/>
						</v-sheet>
					</v-card-text>
					<v-card-text>
						<div class="display-1 font-weight-thin text-center">
							User Registration This Year
						</div>
					</v-card-text>

					<v-divider />

					<v-card-actions class="justify-center">
						<v-btn
							block
							text
						>
							Go to Report
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="12">
				<v-card dark>
					<v-toolbar height="auto">
						<v-app-bar-nav-icon>
							<v-icon size="40">
								recent_actors
							</v-icon>
						</v-app-bar-nav-icon>
						<v-toolbar-title>Recent Activities</v-toolbar-title>
						<v-spacer />
						<v-text-field
							v-model="search"
							prepend-inner-icon="search"
							label="Search"
							single-line
							solo
							hide-details
							clearable
						/>
					</v-toolbar>
					<v-data-table
						:headers="headers"
						:items="adminLogs"
						:search="search"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "AdminHomeView",
	data: () => ({
		itemSummary: [
			423,
			446,
			675,
			510,
			590,
			610,
			760,
		],
		userSummary: [
			423,
			446,
			675,
			510,
			590,
			610,
			760,
			200,
			1000,
			300,
			600,
			750
		],
		itemSummaryLabels: [
			"Momo",
			"Chowmein",
			"Burger",
			"Pizza",
			"Ruslan Vodka",
			"Chips",
			"Old Durbar"
		],
		userSummaryLabels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		search: "",
		headers: [
			{
				text: "TimeStamp",
				align: "start",
				value: "timestamp",
			},
			{ text: "Type", value: "type" },
			{ text: "Actor", value: "actor" },
			{ text: "Details", value: "details" },
		],
		adminLogs: [
			{
				timestamp: "Dec 7, 2020 5:15 AM",
				type: "Create",
				actor: "John Doe",
				details: "Added item (Burger) in store.",
			},
			{
				timestamp: "Dec 7, 2020 5:20 AM",
				type: "Update",
				actor: "Conor Mcgregor",
				details: "Updated price of item (Burger) in store.",
			},
			{
				timestamp: "Dec 7, 2020  6:15 AM",
				type: "Delete",
				actor: "Muhammad Ali",
				details: "Deleted item (Burger) from store.",
			},
			{
				timestamp: "Dec 7, 2020 6:30 AM",
				type: "Delivery Completed",
				actor: "Lionel Messi",
				details: "3 items delivered successfully to 'Amarsingh 5, Pokhara' for user 'Khabib'",
			},
			{
				timestamp: "Dec 7, 2020  8:20 PM",
				type: "Payment Completed",
				actor: "Sandra Williams",
				details: "User 'Khabib' completed payment for order #56256",
			},
		]
	})
}
</script>
