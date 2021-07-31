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
	getFormData(data) {
		let formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (!keysToIgnore.includes(key)) {
				if (Array.isArray(value)) {
					for (let i = 0; i < value.length; i++) {
						formData.append(`${key}`, value[i]);
					}
				} else if(value) {
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
	/**
	 * @param {[Object]} orderKOTItems
	 * @return {[]}
	 */
	groupOrderKOTByBatch(orderKOTItems) {
		let tempKOTBatchArray = []
		let batchGroupedKOTItems = []
		orderKOTItems.forEach(item => {
			if (!tempKOTBatchArray.includes(item.batch)) {
				batchGroupedKOTItems.push({
					id: item.id,
					batch: item.batch,
					cartItems: [
						{
							itemName: item["cart_item"].item.name,
							quantity: item["cart_item"].quantity,
							quantityDiff: item["quantity_diff"]
						}
					],
					timestamp: item.timestamp,
				})
				tempKOTBatchArray.push(item.batch)
			} else {
				const objIndex = batchGroupedKOTItems.findIndex((obj => obj.batch === item.batch))
				batchGroupedKOTItems[objIndex].cartItems.push({
					itemName: item["cart_item"].item.name,
					quantity: item["cart_item"].quantity,
					quantityDiff: item["quantity_diff"]
				})
			}
		})
		console.log(batchGroupedKOTItems)
		return batchGroupedKOTItems
	},
	/**
	 * @param {[Object]} kotList
	 * @return {[]}
	 */
	groupKOTsByOrder(kotList) {
		let tempOrderIdArray = []
		let orderKOTs = []
		kotList.forEach(kot => {
			if (!tempOrderIdArray.includes(kot.order.id)) {
				orderKOTs.push({
					orderId: kot.order.id,
					timestamp: kot.timestamp,
					cartItems: [
						{
							id: kot.id,
							timestamp: kot.timestamp,
							name: kot["cart_item"].item.name,
							quantity: kot["cart_item"].quantity,
							quantityDiff: kot["quantity_diff"],
							batch: kot.batch,
						}
					],
				})
				tempOrderIdArray.push(kot.order.id)
			} else {
				const index = orderKOTs.findIndex((obj => obj.orderId === kot.order.id))
				orderKOTs[index].cartItems.push({
					name: kot["cart_item"].item.name,
					quantity: kot["cart_item"].quantity,
					quantityDiff: kot["quantity_diff"],
					batch: kot.batch
				})
			}
		})
		console.log(orderKOTs)
		return orderKOTs
	},
	/**
	 *
	 * @param kotItem
	 * @param doc
	 * @param {Number} orderId
	 * @param {[Object]} kotItem.cartItems
	 * @param {Number} kotItem.id
	 * @param {Number} kotItem.batch
	 * @param {String} kotItem.timestamp
	 */
	generateKOTPDF(kotItem, doc, orderId) {
		const columns = [
			{title: "ID", dataKey: "id"},
			{title: "Particulars", dataKey: "particular"},
			{title: "Qty", dataKey: "quantity"},
		]
		let itemsForDocument = []
		kotItem.cartItems.forEach((item, index) => {
			itemsForDocument.push({
				id: index +1,
				particular: item.itemName,
				quantity: item.quantityDiff
			})
		})
		doc
			.setFontSize(10)
			.text(
				"Order ID: " + orderId,
				7,
				11,
			)
		doc
			.setFontSize(9)
			.text(
				"KOT ID: " + kotItem.id,
				7,
				17,
			)
		doc
			.setFontSize(9)
			.text(
				"KOT Batch Number: " + kotItem.batch,
				7,
				22,
			)
		doc
			.setFontSize(9)
			.text(
				"Timestamp: " + kotItem.timestamp,
				7,
				27,
			)
		doc.autoTable({
			columns,
			styles: {
				fillColor: [128, 128, 128],
				cellPadding: 1.6,
				fontSize: 10,
				cellWidth: 32
			},
			body: itemsForDocument,
			margin: {left: 7, top: 30},
			tableWidth: "wrap",
		})
		const docName = "KOT#" + kotItem.id + ".pdf"
		doc.save(docName)
		doc.autoPrint()
	}
}
