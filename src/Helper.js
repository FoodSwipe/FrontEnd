const keysToIgnore = [
	"id",
	"created_by",
	"updated_by",
	"approved_by",
	"created_at",
	"approved_at",
	"updated_at"
]

module.exports = {
	cookEditData(targetData, to_strip_fields_array) {
		to_strip_fields_array.forEach((field) => {
			const datum = targetData[field]
			delete targetData[field]
			if (Array.isArray(datum)) {
				targetData[field] = []
				datum.forEach((data) => {
					targetData[field].push(data.id)
				})
			} else targetData[field] = datum.id
		})
		return targetData
	},
	/**
	 * Return form data for provided raw object
	 * @param {Object} data raw data to be parsed
	 *
	 * @return {FormData}
	 */
	getFormData(data) {
		let formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (!keysToIgnore.includes(key)) {
				if (Array.isArray(value)) {
					for (let i = 0; i < value.length; i++) {
						formData.append(`${key}`, value[i]);
					}
				} else {
					formData.append(key, value)
				}
			}
		}
		return formData
	},
	refineOrderNowList(list) {
		let orderNowRefinedList = []
		if (list.length > 0) {
			let checkGroup = ""
			list.forEach((item, index) => {
				if (checkGroup !== item.group) {
					checkGroup = item.group
					if (index !== 0) orderNowRefinedList.push({ divider: true })
					orderNowRefinedList.push({ header: checkGroup })
				}
				orderNowRefinedList.push(item)
			})
		}
		return orderNowRefinedList
	},
	removeCartedItemsDuplicationFromOrderNowList(totalItemsList, cartList) {
		if (cartList.length === 0) {
			return totalItemsList
		}
		let magic = []
		let itemIdArray = []
		cartList.forEach((iter) => {
			itemIdArray.push(iter.item.id)
		})
		totalItemsList.forEach(iter => {
			if (!itemIdArray.includes(iter.id)) {
				magic.push(iter)
			}
		})
		return magic
	},
	getCurrentUser() {
		return JSON.parse(localStorage.getItem("currentUser"));
	},
	isAdminUser() {
		const currentUser = this.getCurrentUser()
		if (currentUser) return (currentUser["admin"] === true)
		else return false
	},
	isStaffUser() {
		const currentUser = this.getCurrentUser()
		if (currentUser) return (currentUser["staff"] === true)
		else return false
	},
	getCookingOrderId() {
		return localStorage.getItem("cookingOrder")
	},
	isAuthenticated() {
		const currentUser = this.getCurrentUser()
		return (currentUser !== null)
	},
	removeCookingOrderIdFromLocalStorage() {
		localStorage.removeItem("cookingOrder")
	},
	setTokenOnLocalStorage(token) {
		localStorage.setItem("token", token)
	},
	setCurrentUserOnLocalStorage(value) {
		localStorage.setItem("currentUser", value)
	},
	setCookingOrderOnLocalStorage(value) {
		localStorage.setItem("cookingOrder", value)
	},
	getAccessToken() {
		return localStorage.getItem("token")
	},
	getDeliveryCharge() {
		const today = new Date()
		const DELIVERY_START_PM = 17
		const DELIVER_START_AM = 4
		const DELIVERY_CHARGE = 50

		if (today.getHours() >= DELIVERY_START_PM || today.getHours() <= DELIVER_START_AM) {
			return DELIVERY_CHARGE
		} else return 0
	},
	getLoyaltyDiscount(totalPrice) {
		const LOYALTY_10_PER_FROM = 10000
		const LOYALTY_12_PER_FROM = 12000
		const LOYALTY_13_PER_FROM = 15000
		const LOYALTY_15_PER_FROM = 20000

		if (totalPrice >= LOYALTY_10_PER_FROM && totalPrice < LOYALTY_12_PER_FROM) {
			return 10
		} else if(totalPrice >= LOYALTY_12_PER_FROM && totalPrice < LOYALTY_13_PER_FROM) {
			return 12
		} else if (totalPrice >= LOYALTY_13_PER_FROM && totalPrice < LOYALTY_15_PER_FROM) {
			return 13
		} else if (totalPrice >= LOYALTY_15_PER_FROM) {
			return 15
		} else {
			return 0
		}
	},
	getCartSummary(
		order, cartItems, delivery_charge=null, loyalty_discount=null
	) {
		if (!order) return []

		let totalPrice = 0
		let totalItems = 0
		let deliveryCharge = 0
		let loyaltyDiscount = 0
		let grandTotal = 0

		cartItems.forEach(item => {
			totalPrice += item.quantity * item.item.price
			totalItems += item.quantity
		})

		if (!loyalty_discount) {
			loyaltyDiscount = this.getLoyaltyDiscount(totalPrice)
		} else {
			loyaltyDiscount = parseInt(loyalty_discount)
		}

		grandTotal = totalPrice
		grandTotal -= (loyaltyDiscount / 100) * totalPrice

		if (!delivery_charge) {
			deliveryCharge = this.getDeliveryCharge()
		} else {
			deliveryCharge = parseInt(delivery_charge)
		}

		grandTotal += deliveryCharge
		return {
			totalItems: totalItems,
			totalPrice: totalPrice,
			loyaltyDiscount: loyaltyDiscount,
			grandTotal: grandTotal,
			deliveryCharge: deliveryCharge
		}
	},
	onlyDate(value) {
		if (!value) return null
		return value.substr(0, value.indexOf(" "))
	},
	onlyTime(value) {
		if (!value) return null
		return value.substr(value.indexOf(" ")+1, value.length)
	},
}
