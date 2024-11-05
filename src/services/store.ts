import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux'
import { reducer as peopleReducer } from './slices/peopleSlice'
import { reducer as planetsReducer } from './slices/planetsSlice'
import { reducer as shipsReducer } from './slices/shipsSlice'
import { reducer as elementDetailsReducer } from './slices/elementDetailsSlice'
import { reducer as authReducer } from './slices/authSlice'

export const rootReducer = combineReducers({
	people: peopleReducer,
	planets: planetsReducer,
	ships: shipsReducer,
	elementDetails: elementDetailsReducer,
	auth: authReducer,
})

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = () => dispatchHook()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store
