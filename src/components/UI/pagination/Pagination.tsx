import React from 'react'
import styles from './pagination.module.css'

type PaginationProps = {
	handleNextPage: () => void
	handlePrevPage: () => void
	totalPages: number
	page: number
}

export const PaginationUI = ({
	handleNextPage,
	handlePrevPage,
	totalPages,
	page,
}: PaginationProps) => {
	return (
		<div className={styles.pagesWrapper}>
			<button
				className={styles.pagesBtn}
				onClick={handlePrevPage}
				disabled={page === 1}
			>
				Previous
			</button>
			<div className={styles.pagesNumber}>{page}</div>
			<button
				className={styles.pagesBtn}
				onClick={handleNextPage}
				disabled={page === totalPages}
			>
				Next
			</button>
		</div>
	)
}
