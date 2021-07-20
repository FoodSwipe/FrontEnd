import $api from "@/handler/axios"
const util = require("util")
const urls = require("@/urls.json")
const kotUrls = urls.kot

const state = {
	kots: {},
	kot: {}
}

const mutations = {
	SET_KOTS(state, value) {
		state.kots = value
	},
	SET_KOT(state, value) {
		state.kot = value
	}
}

const getters = {
	allKots: state => {
		return state.kots.results
	},
	kotDetail: state => {
		return state.kot
	}
}

const actions = {
	/**
	 * Fetches all kot form BO
	 *
	 * @param commit
	 * @return {Promise<void>}
	 */
	async fetchAllKots({commit}) {
		const res = await $api.get(kotUrls.list)
		commit("SET_KOTS", res)
	},
	/**
	 * Fetch particular kot by its ID
	 * @param commit
	 * @param {Object} payload
	 * @param {number} payload.kotId
	 *
	 * @return {Promise<void>}
	 */
	async fetchDetail({commit}, payload) {
		const res = await $api.get(util.format(kotUrls.detail, payload.kotId))
		commit("SET_KOT", res)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
