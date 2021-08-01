import { mapGetters } from "vuex"

const ToCart = {
	computed: {
		...mapGetters({
			pendingOrder: "order/detailOrder"
		}),
		cartItems() {
			const items = {}
			if (!this.pendingOrder) return items
			this.pendingOrder["cart_items"].forEach(item => {
				items[item.item.name] = item
			})
			return items
		}
	},
	methods: {
		async addItemToCart(item) {
			this.loadingCartBtn = true
			console.log("whats going on")
			if (this.$helper.getCookingOrderId()) {
				this.$bus.emit("add-item-to-cart", {
					withItem: item
				})
			} else {
				if (this.$helper.isAuthenticated()) {
					const currentUser = this.$helper.getCurrentUser()
					// set last order location ? TBD
					this.$bus.emit("start-order-prefill", {
						order: {
							custom_location: currentUser.profile.address,
							custom_contact: (currentUser.profile.contact)
								? currentUser.profile.contact.replace(/\D/g, "")
								: null
						},
						withItem: item
					})
				}
				else {
					this.$bus.emit("start-order", {
						withItem: item
					})
				}
			}
			this.loadingCartBtn = false
		},
	},
}

export default ToCart
