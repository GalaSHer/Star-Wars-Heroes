import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../services/store'
import { TableUI } from '../components/UI/table/TableUI'
import { PaginationUI } from '../components/UI/pagination/Pagination'
import { Loader } from '../components/UI/loader/Loader'
import {
	fetchPlanets,
	getPlanetsSelector,
	planetsLoadingSelector,
	totalPagesSelector,
} from '../services/slices/planetsSlice'
import { Header } from '../components/header/Header'

export const Planets: FC = () => {
	const dispatch = useDispatch()
	const planets = useSelector(getPlanetsSelector)
	const isLoading = useSelector(planetsLoadingSelector)
	const totalPages = useSelector(totalPagesSelector)
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		dispatch(fetchPlanets(page))
	}, [dispatch, page])

	const handleNextPage = () => {
		if (page < totalPages) {
			setPage((prev) => prev + 1)
		}
	}

	const handlePrevPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1)
		}
	}

	return (
		<>
			<Header />
			{isLoading ? (
				<Loader />
			) : (
				<>
					<TableUI elementsList={planets} tableTitle='Star Wars Planets' />
					<PaginationUI
						handleNextPage={handleNextPage}
						handlePrevPage={handlePrevPage}
						totalPages={totalPages}
						page={page}
					/>
				</>
			)}
		</>
	)
}
