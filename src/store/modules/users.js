import $api from "@/handler/axios"
import urls from "@/urls.json"

const userUrls = urls.user

export const SET_USER = "SET_USER"
export const SET_USERS = "SET_USERS"
export const SET_REGISTER_ERROR_MESSAGES = "SET_REGISTER_ERROR_MESSAGES"

const state = {
	users: [],
	user: {},
	registerError: {
		first_name: null,
		last_name: null,
		username: null,
		email: null,
		contact: null,
		address: null,
		password: null,
	}
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
	}
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
	}
}

const actions = {
	getAllUsers({commit}) {
		$api.get(userUrls.listUsers).then(res => {
			commit("SET_USERS", res)
			resolve(res)
		})
	},
	getUser({commit}, payload) {
		$api.get(utils.format(userUrls.userDetail, payload.id)).then(res => {
			commit("SET_USER", res)
			resolve(res)
		})
	},
	async register({state, commit}, payload) {
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
