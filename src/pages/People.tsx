import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../services/store'
import {
	fetchPeople,
	getPeopleSelector,
	peopleLoadingSelector,
	totalPagesSelector,
} from '../services/slices/peopleSlice'
import { TableUI } from '../components/UI/table/TableUI'
import { PaginationUI } from '../components/UI/pagination/Pagination'
import { Loader } from '../components/UI/loader/Loader'
import { Header } from '../components/header/Header'

export const People: FC = () => {
	const dispatch = useDispatch()
	const people = useSelector(getPeopleSelector)
	const isLoading = useSelector(peopleLoadingSelector)
	const totalPages = useSelector(totalPagesSelector)
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		dispatch(fetchPeople(page))
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
					<TableUI elementsList={people} tableTitle='Star Wars Persons' />
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
