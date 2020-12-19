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
