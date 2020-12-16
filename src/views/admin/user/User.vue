<template>
	<v-data-table
		dark
		:search="searchUsers"
		:headers="headers"
		:items="users"
		sort-by="calories"
		class="elevation-1"
	>
		<template #top>
			<v-toolbar
				flat
			>
				<v-app-bar-nav-icon>
					<v-icon>
						group
					</v-icon>
				</v-app-bar-nav-icon>
				<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
					Food Swipe Users
				</v-toolbar-title>
				<v-divider
					inset
					vertical
					class="mx-4"
				/>
				<v-text-field
					id="search-user"
					v-model="searchUsers"
					solo
					dense
					clearable
					hide-details
					prepend-inner-icon="search"
					placeholder="Search Users"
				/>
				<v-spacer />
				<v-divider
					inset
					vertical
					class="mx-4"
				/>
				<v-btn
					dark
					color="primary"
					@click="openAddUserFormDialog"
				>
					<v-icon
						dark
						:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
					>
						add_circle
					</v-icon>
					<span v-if="$vuetify.breakpoint.smAndUp">New User</span>
				</v-btn>
				<user-form-dialog />
			</v-toolbar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.profile="{item}">
			<v-avatar size="40"
				class="cursor golden-rod-border-2"
				@click="routeToUserDetailPage(item.id)"
			>
				<v-img
					v-if="item.image"
					:src="item.image"
				/>
				<template v-else
					class="text-capitalize"
				>
					{{ item.f_name[0] }}
				</template>
			</v-avatar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.contact="props">
			<v-edit-dialog
				v-model:return-value="props.item.contact"
				dark
				@save="updatePhone"
				@cancel="cancelPhoneUpdate"
			>
				<span class="user-phone">{{ props.item.contact }}</span>
				<template #input>
					<v-text-field
						v-model="props.item.name"
						single-line
						type="number"
					/>
				</template>
			</v-edit-dialog>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.address="props">
			<v-edit-dialog
				v-model:return-value="props.item.address"
				dark
				@save="updateAddress"
				@cancel="cancelAddressUpdate"
			>
				<span class="user-address">{{ props.item.address }}</span>
				<template #input>
					<v-text-field
						v-model="props.item.address"
						single-line
						counter
					/>
				</template>
			</v-edit-dialog>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				small
				class="mr-2"
				color="primary"
				@click="openEditUserFormDialog(item)"
			>
				edit
			</v-icon>
			<v-icon
				small
				color="error"
				@click="deleteUser(item)"
			>
				delete
			</v-icon>
		</template>
		<template #no-data>
			<v-btn
				color="primary"
				@click="initialize"
			>
				Reset
			</v-btn>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_superuser="{item}">
			<v-checkbox v-model="item.is_superuser"
				color="orange darken-3"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_staff="{item}">
			<v-checkbox v-model="item.is_staff"
				color="pink darken-3"
			/>
		</template>
	</v-data-table>
</template>
<script>
import router from "@/router"

export default {
	name: "UserAdministration",
	components: {
		UserFormDialog: () => import("./UserFormDialog")
	},
	data: () => ({
		searchUsers: "",
		headers: [
			{ text: "Actions", value: "actions", sortable: false, align: "center" },
			{text: "Avatar", value: "profile", sortable: false, align: "center"},
			{ text: "Username", value: "username", align: "start"},
			{ text: "Phone", value: "contact" },
			{ text: "Address", value: "address" },
			{ text: "Superuser Status", value: "is_superuser" },
			{ text: "Staff user Status", value: "is_staff" },
		],
		users: []
	}),

	created() {
		this.initialize()
	},

	methods: {
		updatePhone() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "success")
			this.$store.dispatch("snack/setSnackText", "User contact updated successfully.")
		},
		cancelPhoneUpdate() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "error")
			this.$store.dispatch("snack/setSnackText", "User contact update aborted.")
		},
		updateAddress() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "success")
			this.$store.dispatch("snack/setSnackText", "User address updated successfully.")
		},
		cancelAddressUpdate() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "error")
			this.$store.dispatch("snack/setSnackText", "User address update aborted.")
		},
		openAddUserFormDialog() {
			this.$bus.emit("open-user-form-dialog-add-item")
		},
		openEditUserFormDialog(item) {
			this.$bus.emit("open-user-form-dialog-edit-item", {
				editedIndex: this.users.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},
		async deleteUser(item) {
			const index = this.users.indexOf(item)
			const reaction = confirm(`Are you sure you want to delete user "${item.username}"?`);
			if (reaction === true) {
				await this.$store.dispatch(
					"user/delete",
					{
						id: item.id,
					})
				this.users.splice(index, 1)
			}
		},
		routeToUserDetailPage(itemId) {
			router.push({name: "User Detail", params: { id: itemId }})
		},
		initialize() {
			this.users = [
				{
					id: 1,
					f_name: "John",
					l_name: "Doe",
					username: "foodLover",
					email: "foo@bar.com",
					contact: 9854159951,
					address: "Lorem ipsum dolar met",
					created_at: "June 5, 2020",
					is_superuser: false,
					is_staff: false,
					image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
				},
				{
					id: 2,
					f_name: "Sandra",
					l_name: "Williams",
					username: "goSandra",
					email: "foo@goo.com",
					contact: 9854159951,
					address: "Lorem ipsum dolar met",
					created_at: "June 5, 2020",
					is_superuser: false,
					is_staff: false,
				},
				{
					id: 3,
					f_name: "Muhammad",
					l_name: "Ali",
					username: "octagon345",
					email: "sar@lar.com",
					contact: 9854159951,
					address: "Lorem ipsum dolar met",
					created_at: "June 5, 2020",
					is_superuser: false,
					is_staff: true,
				},
				{
					id: 4,
					f_name: "Lionel",
					l_name: "Messi",
					username: "heroUser",
					email: "par@kar.com",
					contact: 9854159951,
					address: "Lorem ipsum dolar met",
					created_at: "June 5, 2020",
					is_superuser: true,
					is_staff: true,
				},
				{
					id: 5,
					f_name: "Conor",
					l_name: "McGregor",
					username: "rocky123",
					email: "hel@sel.com",
					contact: 9854159951,
					address: "Lorem ipsum dolar met",
					created_at: "June 5, 2020",
					is_superuser: false,
					is_staff: false,
				},
			]
		},
	},
}
</script>
<style lang="scss" scoped>
.user-phone {
	font-size: 1.1rem; line-height: 1.3rem;
}
.user-address {
	//font-size: .9rem; line-height: 1rem;
}
</style>
