import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../API/api'

interface ApiResponse {
	count: number
	next: string | null
	previous: string | null
	results: TPlanet[]
}

export const fetchPlanets = createAsyncThunk<ApiResponse, number>(
	'planets/fetchPlanets',
	async (page) => {
		const response = await Api.getPlanets(page)
		return response
	}
)

export type TPlanet = {
	name: string
	diameter: string
	rotation_period: string
	orbital_period: string
	population: string
	climate: string
	terrain: string
	surface_water: string
	residents: [string]
	films: [string]
	url: string
	created: string
	edited: string
}

type TPlanetsState = {
	planets: Array<TPlanet>
	loadingPlanets: boolean
	error: string | null
	total: number
	totalPages: number
}

const initialState: TPlanetsState = {
	planets: [],
	loadingPlanets: false,
	error: null,
	total: 0,
	totalPages: 0,
}

export const planetsSlice = createSlice({
	name: 'planets',
	initialState,
	reducers: {},
	selectors: {
		getPlanetsSelector: (state) => state.planets,
		planetsLoadingSelector: (state) => state.loadingPlanets,
		totalItemsSelector: (state) => state.total,
		totalPagesSelector: (state) => state.totalPages,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPlanets.pending, (state) => {
				state.loadingPlanets = true
				state.error = null
			})
			.addCase(fetchPlanets.rejected, (state, action) => {
				state.loadingPlanets = false
				state.error = action.error.message || 'Ошибка'
			})
			.addCase(fetchPlanets.fulfilled, (state, action) => {
				state.loadingPlanets = false
				state.planets = action.payload.results
				state.total = action.payload.count
				state.totalPages = Math.ceil(action.payload.count / 10)
			})
	},
})

export const { reducer } = planetsSlice
export const {
	getPlanetsSelector,
	planetsLoadingSelector,
	totalPagesSelector,
} = planetsSlice.selectors
