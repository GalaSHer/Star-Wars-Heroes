import React from 'react'
import styles from './elementDetails.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch } from '../../services/store'
import { Header } from '../header/Header'
import { setElement } from '../../services/slices/elementDetailsSlice'
import { DetailsForm } from '../DetailsForm/DetailsForm'
import { useFindElementByName } from '../../services/hooks/useFindElementByName'

export const ElementDetails: React.FC = () => {
	const dispatch = useDispatch()
	const params = useParams()
	const name = params.name

	const element = useFindElementByName(name)

	if (!element) {
		return <div className={styles.card}>Element not found.</div>
	}
	dispatch(setElement(element))

	const excludedKeys = ['created', 'edited', 'url', 'films']

	return (
		<>
			<Header />
			<div className={styles.card}>
				<h2 className={styles.title}>{element.name}</h2>
				<div className={styles.details}>
					{Object.entries(element)
						.filter(([key]) => !excludedKeys.includes(key))
						.map(([key, value]) => (
							<div key={key} className={styles.detailItem}>
								<strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong>{' '}
								{Array.isArray(value) ? value.join(', ') : value}
							</div>
						))}
				</div>
				<DetailsForm />
			</div>
		</>
	)
}
