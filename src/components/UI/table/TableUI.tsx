import React from 'react'
import styles from './table.module.css'
import { TPerson } from '../../../services/slices/peopleSlice'
import { TPlanet } from '../../../services/slices/planetsSlice'
import { TShip } from '../../../services/slices/shipsSlice'
import { useNavigate } from 'react-router-dom'

type TableUIProps = {
	elementsList: TPerson[] | TPlanet[] | TShip[]
	tableTitle: string
}

export const TableUI: React.FC<TableUIProps> = ({
	elementsList,
	tableTitle,
}) => {
	const navigate = useNavigate()

	const list = elementsList.map((element) => {
		return (
			<div key={element.name} className={styles.tableRow}>
				<div className={styles.tableItem}>{element.name}</div>
				<div className={styles.tableItem}>
					{'birth_year' in element
						? `${element.birth_year} was born`
						: 'diameter' in element
							? `${element.diameter} diameter`
							: `${element.cost_in_credits} cost in credits`}
				</div>
				<button
					className={styles.tableBtn}
					onClick={() => {
						navigate(`/details/${element.name}`)
					}}
				>
					<p>More</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth='4'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M14 5l7 7m0 0l-7 7m7-7H3'
						></path>
					</svg>
				</button>
			</div>
		)
	})

	return (
		<div className={styles.table}>
			<div className={styles.tableHeader}>{tableTitle}</div>
			<div className={styles.tableData}>{list}</div>
		</div>
	)
}
