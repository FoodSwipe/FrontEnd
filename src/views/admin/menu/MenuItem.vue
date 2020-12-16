<template>
	<v-data-table
		dark
		:headers="headers"
		:items="desserts"
		:search="searchMenuItem"
		class="elevation-1"
	>
		<template #top>
			<v-toolbar
				flat
			>
				<v-toolbar-title>Menu Items</v-toolbar-title>
				<v-divider
					class="mx-4"
					inset
					vertical
				/>
				<v-text-field
					id="search-user"
					v-model="searchMenuItem"
					solo
					dense
					clearable
					hide-details
					prepend-inner-icon="search"
					placeholder="Search menu items"
				/>
				<v-spacer />
				<v-divider
					class="mx-4"
					inset
					vertical
				/>
				<v-dialog
					v-model="dialog"
					dark
					max-width="600"
				>
					<template #activator="{ on, attrs }">
						<v-btn
							color="primary"
							dark
							v-bind="attrs"
							v-on="on"
						>
							<v-icon>add_circle</v-icon><span v-if="$vuetify.breakpoint.width > 600"
								class="pl-2"
							>New Menu Item</span>
						</v-btn>
					</template>
					<v-card class="dark-slate-border-2">
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-container>
							<v-row class="ma-0 pa-0">
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.name"
										clearable
										filled
										label="Menu item name"
										prepend-inner-icon="title"
										hide-details="auto"
									/>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.price"
										label="Price (NRs)"
										filled
										clearable
										prepend-inner-icon="money"
										hide-details="auto"
									/>
								</v-col>
								<v-col cols="12">
									<v-combobox
										v-model="editedItem.ingredients"
										:items="[]"
										hide-selected
										hint="Add ingredient and hit Enter to add a new one."
										label="Ingredients"
										multiple
										small-chips
										deletable-chips
										filled
										attach=""
										clearable
										prepend-inner-icon="casino"
										hide-details="auto"
									/>
								</v-col>
								<v-col cols="6"
									class="checkbox-input-column"
								>
									<v-checkbox v-model="editedItem.is_veg"
										label="Vegetarian ?"
										hide-details="auto"
									/>
								</v-col>
								<v-col cols="6"
									class="checkbox-input-column"
								>
									<v-checkbox v-model="editedItem.is_available"
										label="Available ?"
										hide-details="auto"
									/>
								</v-col>
								<v-col cols="6">
									<v-text-field v-model="editedItem.weight"
										filled
										clearable
										label="Weight (g)"
										hide-details="auto"
										prepend-inner-icon="save_alt"
									/>
								</v-col>
								<v-col cols="6">
									<v-text-field v-model="editedItem.calorie"
										filled
										clearable
										label="Calorie (kCal)"
										hide-details="auto"
										prepend-inner-icon="flash_on"
									/>
								</v-col>
								<v-col cols="12">
									<v-autocomplete v-model="editedItem.type"
										:items="itemTypeArray"
										filled
										chips
										deletable-chips
										multiple
										attach=""
										clearable
										label="Item type"
										hide-details="auto"
										prepend-inner-icon="group_work"
									/>
								</v-col>
								<v-col cols="12">
									<v-autocomplete
										v-model="friends"
										:disabled="isUpdating"
										:items="people"
										filled
										chips
										color="blue darken-2"
										placeholder="Select menu item group"
										item-text="name"
										item-value="name"
										multiple
										prepend-inner-icon="emoji_food_beverage"
										hide-details="auto"
										attach=""
										clearable
										dark
									>
										<template #selection="data">
											<v-chip
												v-bind="data.attrs"
												:input-value="data.selected"
												close
												@click="data.select"
												@click:close="remove(data.item)"
											>
												<v-avatar left>
													<v-img :src="data.item.avatar" />
												</v-avatar>
												{{ data.item.name }}
											</v-chip>
										</template>
										<template #item="data">
											<template v-if="typeof data.item !== 'object'">
												<v-list-item-content v-text="data.item" />
											</template>
											<template v-else>
												<v-list-item-avatar>
													<v-img :src="data.item.avatar" />
												</v-list-item-avatar>
												<v-list-item-content>
													<v-list-item-title>{{ data.item.name }}</v-list-item-title>
													<v-list-item-subtitle>{{ data.item.group }}</v-list-item-subtitle>
												</v-list-item-content>
											</template>
										</template>
									</v-autocomplete>
								</v-col>
								<v-col cols="12">
									<v-file-input
										id="member-image-input"
										v-model="editedItem.imageForUpload"
										class="ma-0"
										filled
										small-chips
										show-size
										accept="image/*"
										label="Add Image"
										clearable
										multiple
										prepend-icon=""
										prepend-inner-icon="camera"
									/>
								</v-col>
							</v-row>
						</v-container>

						<v-card-actions>
							<v-spacer />
							<v-btn
								color="red"
								text
								@click="close"
							>
								Cancel
							</v-btn>
							<v-btn
								color="blue darken-1"
								text
								@click="save"
							>
								Save
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete"
					max-width="500px"
				>
					<v-card
						dark
						color="grey darken-3"
					>
						<v-card-title class="headline">
							Are you sure you want to delete this menu item?
						</v-card-title>
						<v-card-actions>
							<v-spacer />
							<v-btn color="red"
								text @click="closeDelete"
							>
								Cancel
							</v-btn>
							<v-btn color="blue darken-1"
								text @click="deleteItemConfirm"
							>
								OK
							</v-btn>
							<v-spacer />
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.name="props">
			<v-edit-dialog
				v-model:return-value="props.item.name"
				dark
				@save="updateName"
				@cancel="cancelNameUpdate"
			>
				<span class="menu-item-name">{{ props.item.name }}</span>
				<template #input>
					<v-text-field
						v-model="props.item.name"
						single-line
						counter
					/>
				</template>
			</v-edit-dialog>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.price="props">
			<v-edit-dialog
				v-model:return-value="props.item.price"
				dark
				@save="updatePrice"
				@cancel="cancelPriceUpdate"
			>
				<span class="menu-item-price">{{ props.item.price }}</span>
				<template #input>
					<v-text-field
						v-model="props.item.price"
						single-line
						type="number"
					/>
				</template>
			</v-edit-dialog>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_veg="{ item }">
			<v-checkbox v-model="item.is_veg"
				color="green"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_available="{ item }">
			<v-checkbox v-model="item.is_available"
				color="orange"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.type="{ item }">
			<v-row class="ma-0 pa-0 fill-height"
				align="center"
			>
				<v-avatar v-for="(i, index) of item.type"
					:key="index"
					size="20"
					:class="
						item.type.length === index +1 ? '' : 'mr-2'
					"
				>
					<v-img :src="i.image" />
				</v-avatar>
			</v-row>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-btn icon
				color="primary"
				@click="editItem(item)"
			>
				<v-icon size="20">
					edit
				</v-icon>
			</v-btn>
			<v-btn icon
				color="error"
				@click="deleteItem(item)"
			>
				<v-icon size="20">
					delete
				</v-icon>
			</v-btn>
		</template>
		<template #no-data>
			<v-btn
				color="primary"
				@click="initialize"
			>
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>
<script>
import helper from "@/Helper"

export default {
	name: "MenuItemAdministration",
	data: () => ({
		friends: [],
		isUpdating: false,
		dialog: false,
		dialogDelete: false,
		searchMenuItem: "",
		itemTypeArray: [
			"Spicy",
			"Milky",
			"Cheesy",
		],
		headers: [
			{ text: "Actions", value: "actions", align: "start", sortable: false},
			{ text: "Menu Item", value: "name", },
			{ text: "Price (NRs)", value: "price" },
			{ text: "Vegetarian?", value: "is_veg" },
			{ text: "Available?", value: "is_available" },
			{ text: "Type", value: "type"},
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			name: "",
			ingredients: [],
			weight: null,
			calorie: null,
			price: null,
			is_veg: null,
			is_available: null,
			menu_item_group: null,
			menu_item_type: [],
			item_image: null,
			imageForUpload: [],
		},
		defaultItem: {
			name: "",
			ingredients: [],
			weight: null,
			calorie: null,
			price: null,
			is_veg: null,
			is_available: null,
			menu_item_group: null,
			menu_item_type: [],
			item_image: null,
			imageForUpload: [],
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Menu Item" : "Edit Menu Item"
		},
		people() {
			return helper.returnMockMenuItems()
		},
		srcs() {
			return helper.returnMockSrcs()
		}
	},

	watch: {
		dialog(val) {
			val || this.close()
		},
		dialogDelete(val) {
			val || this.closeDelete()
		},
	},

	created() {
		this.initialize()
	},

	methods: {
		updatePrice() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "success")
			this.$store.dispatch("snack/setSnackText", "Menu item price updated successfully.")
		},
		cancelPriceUpdate() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "error")
			this.$store.dispatch("snack/setSnackText", "Menu item price update aborted.")
		},
		updateName() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "success")
			this.$store.dispatch("snack/setSnackText", "Menu item name updated successfully.")
		},
		cancelNameUpdate() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "error")
			this.$store.dispatch("snack/setSnackText", "Menu item name update aborted.")
		},

		remove(item) {
			const index = this.friends.indexOf(item.name)
			if (index >= 0) this.friends.splice(index, 1)
		},
		initialize() {
			this.desserts = [
				{
					name: "Mushroom Burger",
					image: "https://littlespicejar.com/wp-content/uploads/2018/06/Rockin-Sweet-Onion-Swiss-Mushroom-Burger-1-720x720.jpg",
					ingredients: ["Chopped Mushrooms", "Eggs", "Breadcrumbs", "Shredded Cheese", "Onion", "Flour", "Salt", "Pepper", "Lettuce Leaves"],
					weight: 200,
					calorie: 330,
					price: 450.00,
					is_veg: true,
					is_available: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Vegetarian",
							image: "https://e7.pngegg.com/pngimages/741/294/png-clipart-veggie-burger-animal-product-veganism-vegetarianism-computer-icons-veg-symbol-leaf-logo-thumbnail.png"
						}
					],
					menu_item_group: "Burger & Chips"
				},
				{
					menu_item_group: "Burger & Chips",
					name: "Ham Burger",
					description: "A hamburger (also burger for short) is a sandwich consisting of one or more cooked patties of ground meat," +
						" usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, smoked or flame broiled. ",
					image: "https://barbecuebible.com/wp-content/uploads/2013/05/featured-great-american-hamburger-1024x640.jpg",
					ingredients: ["Ground Beef", "Mayonnaise", "Breadcrumbs", "Shredded Cheese", "Onion", "Flour", "Salt", "Chillies", "Lettuce Leaves", "Tomato"],
					weight: 200,
					calorie: 330,
					price: 450.00,
					is_veg: false,
					is_available: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Non Veg",
							image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
						}
					]
				},
				{
					menu_item_group: "MoMo",
					name: "Veg Momo",
					description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
						" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus",
					image: "https://c.ndtvimg.com/2020-01/2brioi88_momos_625x300_21_January_20.jpg",
					ingredients: [
						"Maida",
						"salt",
						"baking powder",
						"grated carrot",
						"grated cabbage",
						"onion",
						"garlic",
						"vinegar",
						"black pepper",
						"soya sauce"

					],
					weight: 200,
					calorie: 357.1,
					price: 450.00,
					is_veg: true,
					is_available: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Vegetarian",
							image: "https://e7.pngegg.com/pngimages/741/294/png-clipart-veggie-burger-animal-product-veganism-vegetarianism-computer-icons-veg-symbol-leaf-logo-thumbnail.png"
						}
					]
				},
				{
					menu_item_group: "MoMo",
					name: "Chicken Momo",
					description: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat," +
						" accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit.",
					image: "https://img.taste.com.au/mdKxKxoR/taste/2016/11/chicken-momos-with-tomato-achar-46671-1.jpeg",
					ingredients: [
						"ground chicken breast and thigh",
						"white onion",
						"scallions",
						"grated ginger",
						"grated garlic",
						"white pepper",
						"cumin powder",
						"salt",
						"chopped cilandtro",
						"green chilli sauce",
						"ripe tomatoes",
					],
					weight: 200,
					calorie: 450,
					price: 450.00,
					is_veg: false,
					is_available: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Non Veg",
							image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
						}
					]
				},
				{
					menu_item_group: "MoMo",
					name: "Fried Chicken Momo",
					description: "Fried version of chicken momo.",
					image: "https://i.pinimg.com/originals/b4/12/81/b4128152cbdae56c4eb9055748f3b1dd.png",
					ingredients: [
						"ground chicken breast and thigh",
						"white onion",
						"scallions",
						"grated ginger",
						"grated garlic",
						"white pepper",
						"cumin powder",
						"salt",
						"chopped cilandtro",
						"green chilli sauce",
						"ripe tomatoes",
					],
					weight: 200,
					calorie: 450,
					price: 450.00,
					is_veg: false,
					is_available: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Non Veg",
							image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
						}
					]
				},
				{
					menu_item_group: "Chowmein",
					name: "Veg Chowmein",
					description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
						" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
						" nibh. Nulla porttitor accumsan tincidunt.",
					image: "https://i.pinimg.com/originals/9f/45/3d/9f453d36b8d2526a1f1bbe74145aedb9.jpg",
					weight: 300,
					calorie: 250,
					ingredients: [],
					price: 150,
					isVeg: true,
					isAvailable: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Vegetarian",
							image: "https://e7.pngegg.com/pngimages/741/294/png-clipart-veggie-burger-animal-product-veganism-vegetarianism-computer-icons-veg-symbol-leaf-logo-thumbnail.png"
						}
					]
				},
				{
					menu_item_group: "Chowmein",
					name: "Chicken Chowmein",
					description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
						" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
						" nibh. Nulla porttitor accumsan tincidunt.",
					image: "https://charlotteslivelykitchen.com/wp-content/uploads/2015/01/Chicken-Chow-Mein-Square-Image.jpg",
					weight: 300,
					calorie: 350,
					ingredients: [],
					price: 150,
					isVeg: false,
					isAvailable: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Non Veg",
							image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
						}
					]
				},
				{
					menu_item_group: "Chowmein",
					name: "Buff Chowmein",
					description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
						" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
						" nibh. Nulla porttitor accumsan tincidunt.",
					image: "https://goodfoodnepal.com/wp-content/uploads/2019/04/Buff-Chowmein.jpg",
					weight: 300,
					calorie: 500,
					ingredients: [
						"Dried or egg noodles",
						"chopped onions",
						"buffalo meat or sukuti",
						"chopped capsicum",
						"green chilli",
						"soy sause",
						"salt",
						"pinch of ajinomoto",
						"chopped coriander"
					],
					price: 150,
					isVeg: false,
					isAvailable: true,
					type: [
						{
							name: "Spicy",
							image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
						},
						{
							name: "Non Veg",
							image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
						}
					]
				},
				{
					menu_item_group: "Beverages",
					name: "Ruslan Vodka",
					description: "We are Ruslan. We bring decades of uncompromised quality, incredible taste and countless fun memories.",
					image: "https://i.pinimg.com/originals/c3/49/25/c349256a498e3a73af914f2d4adf467b.jpg",
					weight: 1,
					calorie: 500,
					ingredients: [],
					price: 1500,
					isVeg: false,
					isAvailable: true,
					type: [
						{
							name: "Hard Drinks",
							image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Licor-Beir%C3%A3o-%26-Orus_-_Orus_Clothing_%28cropped%29.png"
						},
						{
							name: "Drinks",
							image: "https://i.pinimg.com/originals/99/38/69/99386945bb7208f7a14faf4ddf5083be.png"
						}
					]
				},
				{
					menu_item_group: "Beverages",
					name: "Old Durbar",
					description: "We are Ruslan. We bring decades of uncompromised quality, incredible taste and countless fun memories.",
					image: "https://2.bp.blogspot.com/-H94lYgSr1XQ/XFzvxImlHEI/AAAAAAAANak/M4S7t2KkN0QWXHtSx0aM9zmmRprK8ot3ACLcBGAs/s1600/Cover.PNG",
					weight: 1,
					calorie: 500,
					ingredients: [],
					price: 1500,
					isVeg: false,
					isAvailable: true,
					type: [
						{
							name: "Hard Drinks",
							image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Licor-Beir%C3%A3o-%26-Orus_-_Orus_Clothing_%28cropped%29.png"
						},
						{
							name: "Drinks",
							image: "https://i.pinimg.com/originals/99/38/69/99386945bb7208f7a14faf4ddf5083be.png"
						}
					]
				}
			]
		},

		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1)
			this.closeDelete()
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		closeDelete() {
			this.dialogDelete = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem)
			} else {
				this.desserts.push(this.editedItem)
			}
			this.close()
		},
	},
}
</script>
<style lang="scss" scoped>
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
.checkbox-input-column {
	::v-deep.v-input--checkbox {
		background-color: rgb(255 255 255 / 8%);
		margin-top: 0;
		padding: 18px 12px;
		border-bottom: 1px solid rgb(156 155 150) !important;
		border-radius: 3px 3px 0 0;
		&:hover {
			background-color: #484848;
		}
	}
}
.menu-item-name {
	font-size: 1.1rem; line-height: 1.3rem;
}
.menu-item-price {
	font-size: 1.1rem; line-height: 1.3rem;
}
</style>
