import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPerson } from './peopleSlice'
import { TPlanet } from './planetsSlice'
import { TShip } from './shipsSlice'

type TElementDetailsState = {
	element: TPerson | TPlanet | TShip | null
}

const initialState: TElementDetailsState = {
	element: null,
}

export const elementDetailsSlice = createSlice({
	name: 'elementDetails',
	initialState,
	selectors: {
		getElementSelector: (state) => state.element,
	},
	reducers: {
		setElement: (
			state,
			action: PayloadAction<TPerson | TPlanet | TShip | null>
		) => {
			state.element = action.payload
		},
	},
})

export const { setElement } = elementDetailsSlice.actions
export const { getElementSelector } = elementDetailsSlice.selectors

export const { reducer } = elementDetailsSlice
