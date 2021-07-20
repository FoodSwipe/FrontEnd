import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")
const menuItemGroupUrls = urls.menuItemGroup

export const SET_MENU_ITEM_GROUPS = "SET_MENU_ITEM_GROUPS"
export const SET_MENU_ITEM_GROUP = "SET_MENU_ITEM_GROUP"
export const SET_MENU_ITEM_GROUP_FORM_ERRORS = "SET_MENU_ITEM_GROUP_FORM_ERRORS"

const defaultErrors = {
	name: null,
	description: null,
	created_at: null,
	created_by: null,
	updated_at: null,
	updated_by: null,
	image: null,
}

const state = {
	menuItemGroups: {},
	menuItemGroup: {},
	menuItemGroupFormErrors: {
		...defaultErrors
	}
}

const mutations = {
	[SET_MENU_ITEM_GROUPS](state, value){
		state.menuItemGroups = value
	},
	[SET_MENU_ITEM_GROUP](state, value) {
		state.menuItemGroup = value
	},
	[SET_MENU_ITEM_GROUP_FORM_ERRORS](state, value) {
		state.menuItemGroupFormErrors = value
	}
}

const getters = {
	allMenuItemGroups: state => {
		return state.menuItemGroups.results
	},
	detailMenuItemGroup: state => {
		return state.menuItemGroup
	},
	menuItemGroupFormErrors: state => {
		return state.menuItemGroupFormErrors
	}
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_MENU_ITEM_GROUP_FORM_ERRORS", {
			...defaultErrors
		})
	},
	async withItems({commit}) {
		const res = await $api.get(menuItemGroupUrls.withItems)
		commit("SET_MENU_ITEM_GROUPS", res)
	},
	async fetchAll({ commit }) {
		const res = await $api.get(menuItemGroupUrls.list)
		commit("SET_MENU_ITEM_GROUPS", res)
	},
	async create({commit}, payload) {
		try {
			await $api.post(menuItemGroupUrls.list, payload)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MENU_ITEM_GROUP_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async update({commit}, payload) {
		try {
			await $api.put(util.format(menuItemGroupUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MENU_ITEM_GROUP_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(menuItemGroupUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(menuItemGroupUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				return e.response.data
			}
			return 500
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
