<template>
	<v-data-table
		:loading="loading"
		dark
		:search="searchUsers"
		:headers="headers"
		:items="users"
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
		<template #item.username="{item}">
			<div
				class="cursor"
				@click="routeToUserDetailPage(item.user.id)"
			>
				{{ item.user.username }}
			</div>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.contact="props">
			<v-edit-dialog
				v-model:return-value="props.item.contact"
				dark
				@save="updatePhone(props.item)"
				@cancel="cancelPhoneUpdate"
			>
				<span class="user-phone">{{ props.item.contact }}</span>
				<template #input>
					<v-text-field
						v-model="props.item.contact"
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
				@save="updateAddress(props.item)"
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
			<v-checkbox v-model="item.user.is_superuser"
				color="orange darken-3"
				@change="toggleSuperUserStatus(item)"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_staff="{item}">
			<v-checkbox v-model="item.user.is_staff"
				color="pink darken-3"
				@change="toggleStaffUserStatus(item)"
			/>
		</template>
	</v-data-table>
</template>
<script>
import router from "@/router"
import { mapGetters } from "vuex"

export default {
	name: "UserAdministration",
	components: {
		UserFormDialog: () => import("./UserFormDialog")
	},
	data: () => ({
		loading: false,
		searchUsers: "",
		headers: [
			{ text: "Actions", value: "actions", sortable: false, align: "center" },
			{ text: "Username", value: "username", align: "start"},
			{ text: "Phone", value: "contact" },
			{ text: "Address", value: "address" },
			{ text: "Superuser Status", value: "is_superuser" },
			{ text: "Staff user Status", value: "is_staff" },
		],
	}),

	computed: {
		...mapGetters({
			users: "user/allUsers"
		})
	},
	async created() {
		this.$bus.on("reload-users", this.initialize)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("reload-users", this.initialize)
	},

	methods: {
		async toggleSuperUserStatus(item) {
			const updated = await this.$store.dispatch("user/toggleSuperUserStatus", {
				userId: item.user.id
			})
			if (updated === true) {
				await this.openSnack("User superuser status updated successfully.", "success")
			}
		},
		async toggleStaffUserStatus(item) {
			const updated = await this.$store.dispatch("user/toggleStaffUserStatus", {
				userId: item.user.id
			})
			if (updated === true) {
				await this.openSnack("User staff status updated successfully.", "success")
			}
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async updatePhone(item) {
			const updated = await this.$store.dispatch("user/updateContact", {
				profileId: item.id,
				contact: item.contact
			})
			if (updated === true) {
				await this.openSnack("User contact updated successfully.", "success")
			} else if(updated === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(updated.contact[0])
			}
		},
		cancelPhoneUpdate() {
			// do nothing
		},
		async updateAddress(item) {
			const updated = await this.$store.dispatch("user/updateAddress", {
				profileId: item.id,
				address: item.address
			})
			if (updated === true) {
				await this.openSnack("User address updated successfully.", "success")
			} else if (updated === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(updated.address[0])
			}
		},
		cancelAddressUpdate() {
			// do nothing
		},
		openAddUserFormDialog() {
			this.$bus.emit("open-user-form-dialog-add-item")
		},
		openEditUserFormDialog(item) {
			console.log(item)
			this.$bus.emit("open-user-form-dialog-edit-item", {
				editedIndex: this.users.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},
		async deleteUser(item) {
			const index = this.users.indexOf(item)
			const reaction = confirm(`Are you sure you want to delete user "${item.user.username}"?`);
			if (reaction === true) {
				await this.$store.dispatch(
					"user/delete",
					{
						id: item.user.id,
					})
				this.users.splice(index, 1)
				this.openSnack("User deleted successfully.")
			}
		},
		routeToUserDetailPage(itemId) {
			router.push({name: "User Detail", params: { id: itemId }})
		},
		async initialize() {
			this.loading = true
			await this.$store.dispatch("user/getAll")
			this.loading = false
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
