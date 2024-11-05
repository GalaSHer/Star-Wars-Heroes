import { useSelector } from 'react-redux'
import { getPeopleSelector } from '../slices/peopleSlice'
import { getPlanetsSelector } from '../slices/planetsSlice'
import { getShipsSelector } from '../slices/shipsSlice'
import { useDispatch } from '../store'
import { setElement } from '../slices/elementDetailsSlice'

export const useFindElementByName = (name: string | undefined) => {
	const people = useSelector(getPeopleSelector)
	const planets = useSelector(getPlanetsSelector)
	const ships = useSelector(getShipsSelector)

	const elementsList = [...people, ...planets, ...ships]
	const findingElement = elementsList.find((element) => element.name === name)

	const dispatch = useDispatch()
	dispatch(setElement(findingElement || null))

	return findingElement
}
