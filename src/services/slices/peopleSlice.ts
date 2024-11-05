import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../API/api'

interface ApiResponse {
	count: number
	next: string | null
	previous: string | null
	results: TPerson[]
}

export const fetchPeople = createAsyncThunk<ApiResponse, number>(
	'people/fetchPeople',
	async (page) => {
		const response = await Api.getPeople(page)
		return response
	}
)

export type TPerson = {
	name: string
	birth_year: string
	eye_color: string
	gender: string
	hair_color: string
	height: string
	mass: string
	skin_color: string
	homeworld: string
	films: [string]
	species: [string]
	starships: [string]
	vehicles: [string]
	url: string
	created: string
	edited: string
}

type TPeopleState = {
	people: Array<TPerson>
	loadingPeople: boolean
	error: string | null
	total: number
	totalPages: number
}

const initialState: TPeopleState = {
	people: [],
	loadingPeople: false,
	error: null,
	total: 0,
	totalPages: 0,
}

export const peopleSlice = createSlice({
	name: 'people',
	initialState,
	reducers: {},
	selectors: {
		getPeopleSelector: (state) => state.people,
		peopleLoadingSelector: (state) => state.loadingPeople,
		totalItemsSelector: (state) => state.total,
		totalPagesSelector: (state) => state.totalPages,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPeople.pending, (state) => {
				state.loadingPeople = true
				state.error = null
			})
			.addCase(fetchPeople.rejected, (state, action) => {
				state.loadingPeople = false
				state.error = action.error.message || 'Ошибка'
			})
			.addCase(fetchPeople.fulfilled, (state, action) => {
				state.loadingPeople = false
				state.people = action.payload.results
				state.total = action.payload.count
				state.totalPages = Math.ceil(action.payload.count / 10)
			})
	},
})

export const { reducer } = peopleSlice
export const { getPeopleSelector, peopleLoadingSelector, totalPagesSelector } =
	peopleSlice.selectors
