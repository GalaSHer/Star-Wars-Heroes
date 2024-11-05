import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../services/store'
import { TableUI } from '../components/UI/table/TableUI'
import { PaginationUI } from '../components/UI/pagination/Pagination'
import { Loader } from '../components/UI/loader/Loader'
import {
	fetchShips,
	getShipsSelector,
	shipsLoadingSelector,
	totalPagesSelector,
} from '../services/slices/shipsSlice'
import { Header } from '../components/header/Header'

export const Ships: FC = () => {
	const dispatch = useDispatch()
	const ships = useSelector(getShipsSelector)
	const isLoading = useSelector(shipsLoadingSelector)
	const totalPages = useSelector(totalPagesSelector)
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		dispatch(fetchShips(page))
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
					<TableUI elementsList={ships} tableTitle='StarShips' />
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
