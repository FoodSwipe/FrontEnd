const keysToIgnore = [
	"id",
	"imageForUpload",
	"created_by",
	"updated_by",
	"approved_by",
	"created_at",
	"approved_at",
	"updated_at"
]

const requiredObjectsForUser = ["profile"]

module.exports = {
	/**
	 * Cooks create data for a model
	 *
	 * @param {string} imageKey name of image key
	 * @param {Object} rawData editedItem to be parsed
	 *
	 * @return {Object}
	 */
	cookCreateData({ imageKey= "", rawData= {} }) {
		// remove image from object if not added
		if (rawData.imageForUpload !== undefined) {
			rawData[imageKey] = rawData.imageForUpload[0]
		} else delete rawData[imageKey]
		return rawData
	},
	/**
	 * Cooks edit data for a model
	 * @param {string} target model
	 * @param {Object} rawData editedItem to be parsed
	 * @param {string} imageKey name of image key
	 *
	 * @return {Object}
	 */
	cookEditData({ target= "", rawData= {}, imageKey= "" }) {
		const body = {}
		let objArray = []
		// // get required objects to be id'ed
		// if (target === "branch") objArray = requiredObjectsForBranch
		// else if (target === "event") objArray = requiredObjectsForEvent
		// // get id from objects
		// objArray.forEach(model => {
		// 	if (rawData[model] !== undefined && rawData[model] !== null) {
		// 		if (typeof rawData[model] === "object") {
		// 			body[model] = rawData[model].id
		// 		}
		// 	}
		// })
		// think about image field
		if (rawData.imageForUpload !== undefined) {
			body[imageKey] = rawData.imageForUpload[0]
		}

		// copy entire rawData to a separate body
		for (const [key, value] of Object.entries(rawData)) {
			if(!body.hasOwnProperty(key)) {
				body[key] = value
			}
		}
		// remove image from object if not changed
		if (rawData.imageForUpload !== undefined) {
			body[imageKey] = rawData.imageForUpload[0]
		} else delete body[imageKey]
		return body
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
	returnMockSrcs() {
		return {
			burger: "https://i.insider.com/5d8ca1222e22af53447766c2?width=1100&format=jpeg&auto=webp",
			vegMomo: "https://c.ndtvimg.com/2020-01/2brioi88_momos_625x300_21_January_20.jpg",
			chickenBiryani: "https://static.toiimg.com/thumb/54308405.cms?imgsize=510571&width=800&height=800",
			aaloPakoda: "https://www.whiskaffair.com/wp-content/uploads/2020/07/Aloo-Pakora-3.jpg",
			samosaTarkari: "https://akm-img-a-in.tosshub.com/sites/dailyo//story/embed/201805/chaat-samosa_050218055428.jpg",
			chickenKorma: "https://i.ndtvimg.com/i/2016-10/chicken-korma_650x400_51475662188.jpg",
			buffChowmein: "https://i.ytimg.com/vi/NYpY3fg7pbA/maxresdefault.jpg",
			chickenChowmein: "https://i.ndtvimg.com/i/2016-06/noodles-625_625x350_41465896870.jpg"
		}
	},
	returnMockMenuItems() {
		const srcs = this.returnMockSrcs()
		return [
			{ header: "Fast food" },
			{
				name: "Burger & Chips",
				group: "Fast food",
				avatar: srcs.burger
			},
			{
				name: "Fried Veg Momo",
				group: "Fast food",
				avatar: srcs.vegMomo
			},
			{
				name: "Chicken Biryani",
				group: "Fast food",
				avatar: srcs.chickenBiryani
			},
			{
				name: "Aalo Pakauda",
				group: "Fast food",
				avatar: srcs.aaloPakoda
			},
			{ divider: true },
			{ header: "Momo & Chowmein" },
			{
				name: "Samosa Tarkari",
				group: "Momo & Chowmein",
				avatar: srcs.samosaTarkari
			},
			{
				name: "Chicken Korma",
				group: "Momo & Chowmein",
				avatar: srcs.chickenKorma
			},
			{
				name: "Buff Chowmein",
				group: "Momo & Chowmein",
				avatar: srcs.buffChowmein
			},
			{
				name: "Chicken Chowmein",
				group: "Momo & Chowmein",
				avatar: srcs.chickenChowmein
			},
		]
	}
}
