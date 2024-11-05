import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
	isAuthenticated: boolean
}

const initialState: AuthState = {
	isAuthenticated: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuthenticated = true
		},
		logout: (state) => {
			state.isAuthenticated = false
		},
	},
	selectors: {
		isAuthenticated: (state) => state.isAuthenticated,
	},
})

export const { reducer } = authSlice
export const { login, logout } = authSlice.actions
export const { isAuthenticated } = authSlice.selectors
