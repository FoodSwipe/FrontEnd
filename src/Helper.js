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
	getCurrentUser() {
		return JSON.parse(localStorage.getItem("currentUser"));
	},
	isAdminUser() {
		const currentUser = this.getCurrentUser()
		if (currentUser) return (currentUser.is_superuser === true)
		else return false
	},
	isAuthenticated() {
		const currentUser = this.getCurrentUser()
		return (currentUser !== null)
	}
}
