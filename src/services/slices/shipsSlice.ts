import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../API/api'

interface ApiResponse {
	count: number
	next: string | null
	previous: string | null
	results: TShip[]
}

export const fetchShips = createAsyncThunk<ApiResponse, number>(
	'ships/fetchShips',
	async (page) => {
		const response = await Api.getShips(page)
		return response
	}
)

export type TShip = {
	name: string
	model: string
	starship_class: string
	manufacturer: string
	cost_in_credits: string
	length: string
	crew: string
	passengers: string
	max_atmosphering_speed: string
	hyperdrive_rating: string
	MGLT: string
	cargo_capacity: string
	consumables: string
	pilots: [string]
	films: [string]
	url: string
	created: string
	edited: string
}

type TShipsState = {
	ships: Array<TShip>
	loadingShips: boolean
	error: string | null
	total: number
	totalPages: number
}

const initialState: TShipsState = {
	ships: [],
	loadingShips: false,
	error: null,
	total: 0,
	totalPages: 0,
}

export const shipsSlice = createSlice({
	name: 'ships',
	initialState,
	reducers: {},
	selectors: {
		getShipsSelector: (state) => state.ships,
		shipsLoadingSelector: (state) => state.loadingShips,
		totalItemsSelector: (state) => state.total,
		totalPagesSelector: (state) => state.totalPages,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchShips.pending, (state) => {
				state.loadingShips = true
				state.error = null
			})
			.addCase(fetchShips.rejected, (state, action) => {
				state.loadingShips = false
				state.error = action.error.message || 'Ошибка'
			})
			.addCase(fetchShips.fulfilled, (state, action) => {
				state.loadingShips = false
				state.ships = action.payload.results
				state.total = action.payload.count
				state.totalPages = Math.ceil(action.payload.count / 10)
			})
	},
})

export const { reducer } = shipsSlice
export const { getShipsSelector, shipsLoadingSelector, totalPagesSelector } =
	shipsSlice.selectors
