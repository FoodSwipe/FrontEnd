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
	removeCartedItemsDuplicationFromOrderNowList(orderList, cartList) {
		let magic = []
		if (cartList.length === 0) return orderList
		orderList.forEach((orderItem) => {
			cartList.forEach(cartItem => {
				if (cartItem.item.id !== orderItem.id) {
					magic.push(orderItem)
				}
			})
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
	getCartSummary(order, cartItems) {
		const today = new Date()
		if (!order) return []

		const LOYALTY_DISCOUNT = 10
		const DELIVERY_START_PM = 17
		const DELIVER_START_AM = 4
		const DELIVERY_CHARGE = 50
		const LOYALTY_STARTS_AT = 10000

		let totalPrice = 0
		let totalItems = 0
		let deliveryCharge = 0
		let loyaltyDiscount = 0
		let grandTotal = 0

		cartItems.forEach(item => {
			totalPrice += item.quantity * item.item.price
			totalItems += item.quantity
		})
		grandTotal = totalPrice
		if (totalPrice > LOYALTY_STARTS_AT) {
			loyaltyDiscount = LOYALTY_DISCOUNT
			grandTotal -= (loyaltyDiscount / 100) * totalPrice
		} else grandTotal = totalPrice
		if (today.getHours() >= DELIVERY_START_PM || today.getHours() <= DELIVER_START_AM) {
			deliveryCharge = DELIVERY_CHARGE
			grandTotal += deliveryCharge
		}
		return {
			totalItems: totalItems,
			totalPrice: totalPrice,
			loyaltyDiscount: loyaltyDiscount,
			grandTotal: grandTotal,
			deliveryCharge: deliveryCharge
		}
	}
}
