<template>
	<v-card dark>
		<v-card-title>
			Store Summary
		</v-card-title>
		<v-divider />
		<v-list>
			<v-list-item
				v-for="(item, index) in storeSummary"
				:key="index"
			>
				<v-list-item-avatar>
					<v-avatar color="blue">
						{{ item.field[0] }}
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						{{ item.value }}
					</v-list-item-title>
					<v-list-item-subtitle>{{ item.field }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item>
				<v-list-item-avatar>
					<v-avatar color="blue">
						I
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						<v-row class="ma-0 pa-0">
							<v-avatar
								v-for="(topItem, index) in topItems"
								:key="index*21"
								size="40"
								class="mr-2 mb-2"
							>
								<v-img :src="topItem.image" />
							</v-avatar>
						</v-row>
					</v-list-item-title>
					<v-list-item-subtitle>
						Top Items
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item>
				<v-list-item-avatar>
					<v-avatar color="blue">
						L
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list dense
						one-line
					>
						<v-list-item
							v-for="(recentLocation, index) in recentLocations"
							:key="index*37"
							@click="1"
						>
							{{ recentLocation }}
						</v-list-item>
					</v-list>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>
<script>
export default {
	name: "UserStoreSummaryCard",
	data: () => ({
		storeSummary: [
			{ field: "Order Count", value: 15 },
			{field: "Total Transactions", value: 10},
		],
		topItems: [
			{
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
				name: "Chowmein",
				description: "Chow mein are Chinese stir-fried noodles with vegetables and sometimes meat or tofu." +
					" The dish is popular throughout the Chinese diaspora and appears on the menus" +
					" of most Chinese restaurants abroad.",
				image: "https://static.toiimg.com/thumb/75455420.cms?imgsize=2101247&width=800&height=800",
				items: [
					{
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
					}
				]
			},
			{
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
				name: "Chowmein",
				description: "Chow mein are Chinese stir-fried noodles with vegetables and sometimes meat or tofu." +
					" The dish is popular throughout the Chinese diaspora and appears on the menus" +
					" of most Chinese restaurants abroad.",
				image: "https://static.toiimg.com/thumb/75455420.cms?imgsize=2101247&width=800&height=800",
				items: [
					{
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
					}
				]
			},
		],
		recentLocations: [
			"Amarsingh",
			"Newroad-7",
			"Ring road -8"
		]
	})
}
</script>
