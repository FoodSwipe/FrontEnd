import $api from "@/handler/axios"

export const SET_HOME_PAGE_CONTENT = "SET_HOME_PAGE_CONTENT"
export const SET_HOME_PAGE_CONTENT_FORM_ERRORS = "SET_HOME_PAGE_CONTENT_FORM_ERRORS"

import urls from "@/urls.json"
const util = require("util")

const homePageContentUrls = urls.homePageContent

const defaultFormErrors = {
	heading: null,
	subtitle: null,
	image: null,
	button_text: null,
	button_icon: null,
	button_to: null,
}

const state = {
	swiperImages: {},
	homePageContentFormErrors: {
		... defaultFormErrors
	}
}
const mutations = {
	[SET_HOME_PAGE_CONTENT](state, value) {
		state.swiperImages = value
	},
	[SET_HOME_PAGE_CONTENT_FORM_ERRORS](state, value) {
		state.homePageContentFormErrors = value
	}
}

const getters = {
	allContent: state => {
		return state.swiperImages.results
	},
	homePageContentAllFormErrors: state => {
		return state.homePageContentFormErrors
	}
}

const actions = {
	clearHomePageContentFormErrors({commit}) {
		commit("SET_HOME_PAGE_CONTENT_FORM_ERRORS", defaultFormErrors)
	},
	async fetchAllHomePageContent({ commit }) {
		try {
			const res = await $api.get(homePageContentUrls.unAuthList)
			commit("SET_HOME_PAGE_CONTENT", res)
			return true
		} catch (e) {
			return false
		}
	},
	async create({commit}, payload) {
		try {
			await $api.post(homePageContentUrls.list, payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_HOME_PAGE_CONTENT_FORM_ERRORS", e.response.data)
				return false
			} return 500
		}
	},
	async update({commit}, payload) {
		try {
			await $api.put(util.format(homePageContentUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_HOME_PAGE_CONTENT_FORM_ERRORS", e.response.data)
				return false
			} return 500
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(homePageContentUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_HOME_PAGE_CONTENT_FORM_ERRORS", e.response.data)
				return false
			} return 500
		}
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(homePageContentUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
