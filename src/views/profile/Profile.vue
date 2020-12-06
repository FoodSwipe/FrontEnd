<template>
	<v-card flat
		class="rounded-0"
	>
		<v-row
			id="top-row"
			class="ma-0"
		>
			<v-col
				cols="12"
				xl="3"
				lg="3"
				md="4"
				sm="4"
				class="text-center ma-0 pa-0 py-6"
			>
				<v-avatar
					id="profile-avatar"
					color="white"
					tile
					size="150"
				>
					<v-img src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg" />
				</v-avatar>
				<v-card-title class="profile-name">
					Kiran Parajuli
				</v-card-title>
				<v-card-subtitle class="pb-0 profile-location">
					<v-icon small>
						room
					</v-icon>Amarsingh-7, Pokhara
				</v-card-subtitle>
				<v-card-subtitle class="pt-0 profile-phone">
					<v-icon small>
						call
					</v-icon>9840000000
				</v-card-subtitle>
			</v-col>
			<v-col cols="12"
				xl="9"
				lg="9"
				md="8"
				sm="8"
				class="ma-0 pa-0"
			>
				<about-user />
			</v-col>
		</v-row>
		<profile-timeline />
	</v-card>
</template>
<script>
export default {
	name: "ProfileView",
	components: {
		AboutUser: () => import("@/views/profile/AboutUser"),
		ProfileTimeline: () => import("@/views/profile/ProfileTimeline")
	},
}
</script>
<style lang="sass" scoped>
#top-row
	transition: all .5s
	background: linear-gradient(180deg, #f6d6b1, #fcf9f7)
	#cover-column
		#cover-photo
			border-radius: 0 0 10px 10px
</style>
<style lang="scss" scoped>
#profile-avatar {
	transition: all .3s;
	border: 4px solid white;
	@media only screen and (max-width: 600px) {
		border: 3px solid white;
		height: 110px !important;
		min-width: 110px !important;
		width: 110px !important;
	}
	@media only screen and (max-width: 400px) {
		border: 3px solid white;
		height: 100px !important;
		min-width: 100px !important;
		width: 100px !important;
	}
	@media only screen and (max-width: 130px) {
		border: 3px solid white;
		height: 65px !important;
		min-width: 65px !important;
		width: 65px !important;
	}
}
.golden-active {
	color: rgb(100 79 9) !important
}
.tab-title {
	font-size: .75rem !important;
}
.profile-name {
	display: flex;
	justify-content: center;
	padding-top: 6px;
}
</style>
