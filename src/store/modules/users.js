import $api from "@/handler/axios"
import urls from "@/urls.json"
const util = require("util")

const userUrls = urls.user

export const SET_USER = "SET_USER"
export const SET_USERS = "SET_USERS"
export const SET_REGISTER_ERROR_MESSAGES = "SET_REGISTER_ERROR_MESSAGES"
export const SET_ADD_USER_ERROR_MESSAGES = "SET_ADD_USER_ERROR_MESSAGES"

const defaultSet = {
	first_name: null,
	last_name: null,
	username: null,
	email: null,
	contact: null,
	address: null,
	password: null,
}


const state = {
	users: [],
	user: {},
	registerError: {
		...defaultSet,
	},
	addUserErrors: {
		...defaultSet,
		birth_date: null
	},
}

const mutations = {
	[SET_USER](state, value){
		state.user = value
	},
	[SET_USERS](state, value) {
		state.users = value
	},
	[SET_REGISTER_ERROR_MESSAGES](state, value) {
		state.registerError = value
	},
	[SET_ADD_USER_ERROR_MESSAGES](state, value) {
		state.addUserErrors = value
	},
}

const getters = {
	allUsers: state => {
		return state.users
	},
	user: state => {
		return state.user
	},
	registrationErrors: state => {
		return state.registerError
	},
	addUserErrorMessages: state => {
		return state.addUserErrors
	}
}

const actions = {
	async getAll({commit}) {
		const res = await $api.get(userUrls.listProfiles)
		commit("SET_USERS", res)
	},
	async getSingle({ commit }, payload) {
		const res = await $api.get(util.format(userUrls.userDetail, payload.id))
		commit("SET_USER", res)
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(userUrls.userDetail, payload.id))
		} catch (err) {
			throw err
		}
	},
	async updateContact({}, payload) {
		try {
			await $api.patch(
				util.format(userUrls.profileDetail, payload.profileId),
				{ contact: payload.contact }
			)
			return true
		} catch (err) {
			if (err.response.status === 400) {
				return err.response.data.contact[0]
			} else {
				return 500
			}
		}
	},
	async updateAddress({}, payload) {
		try {
			await $api.patch(
				util.format(userUrls.profileDetail, payload.profileId),
				{ address: payload.address }
			)
			return true
		} catch (err) {
			if (err.response.status === 400) {
				return err.response.data
			} else {
				return 500
			}
		}
	},
	async toggleSuperUserStatus({}, payload) {
		try {
			await $api.post(util.format(userUrls.toggleSuperUserStatus, payload.userId))
			return true
		} catch (err) {
			throw err
		}
	},
	async toggleStaffUserStatus({}, payload) {
		try {
			await $api.post(util.format(userUrls.toggleStaffStatus, payload.userId))
			return true
		} catch (err) {
			throw err
		}
	},
	async register({commit}, payload) {
		try {
			await $api.post(userUrls.register, payload)
			return true
		} catch(e) {
			if (e.response.status === 400) {
				commit("SET_REGISTER_ERROR_MESSAGES", e.response.data)
				return false
			}
			return 500
		}
	},
	clearAddUserErrorMessages({commit}) {
		commit("SET_ADD_USER_ERROR_MESSAGES", {
			...defaultSet,
			birth_date: null
		})
	},
	async addUser({commit}, payload) {
		try {
			await $api.post(userUrls.addUser, payload)
			return true
		} catch(e) {
			if (e.response.status === 400) {
				commit("SET_ADD_USER_ERROR_MESSAGES", e.response.data)
				return false
			}
			return 500
		}
	},
	async update({commit}, payload) {
		try {
			await $api.put(
				util.format(userUrls.updateUserWithProfile, payload.id),
				payload.body
			)
			return true
		} catch(e) {
			if (e.response.status === 400) {
				commit("SET_ADD_USER_ERROR_MESSAGES", e.response.data)
				return false
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
