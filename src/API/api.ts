import axios from 'axios'
import { TPerson } from '../services/slices/peopleSlice'
import { TPlanet } from '../services/slices/planetsSlice'
import { TShip } from '../services/slices/shipsSlice'

interface ApiPeopleResponse {
	count: number
	next: string | null
	previous: string | null
	results: TPerson[]
}

interface ApiPlanetsResponse {
	count: number
	next: string | null
	previous: string | null
	results: TPlanet[]
}

interface ApiShipsResponse {
	count: number
	next: string | null
	previous: string | null
	results: TShip[]
}

export default class Api {
	static async getPeople(page: number): Promise<ApiPeopleResponse> {
		const response = await axios.get('https://swapi.dev/api/people', {
			params: {
				page: page,
			},
		})
		return response.data
	}

	static async getPlanets(page: number): Promise<ApiPlanetsResponse> {
		const response = await axios.get('https://swapi.dev/api/planets/', {
			params: {
				page: page,
			},
		})
		return response.data
	}

	static async getShips(page: number): Promise<ApiShipsResponse> {
		const response = await axios.get('https://swapi.dev/api/starships/', {
			params: {
				page: page,
			},
		})
		return response.data
	}
}
