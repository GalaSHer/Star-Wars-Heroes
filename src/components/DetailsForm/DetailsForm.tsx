import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TPerson } from '../../services/slices/peopleSlice'
import { TPlanet } from '../../services/slices/planetsSlice'
import { TShip } from '../../services/slices/shipsSlice'
import { useSelector } from '../../services/store'
import { getElementSelector } from '../../services/slices/elementDetailsSlice'
import styles from './detailsForm.module.css'

type TElement = TPerson | TPlanet | TShip

export const DetailsForm: React.FC = () => {
	const element = useSelector(getElementSelector)

	const [formData, setFormData] = useState<TElement | null>(element)

	const { register, handleSubmit, reset } = useForm<TElement>({
		defaultValues: element || { name: '' },
	})

	const onSubmit = (data: TElement) => {
		setFormData(data)
	}

	useEffect(() => {
		if (element) {
			setFormData(element)
			reset(element)
		}
	}, [element, reset])

	if (!formData) {
		return <div>Element not found.</div>
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2 className={styles.title}>Edit {formData.name}</h2>
			<div className={styles.wrapper}>
				<label htmlFor='name'>Name:</label>
				<input className={styles.input} id='name' {...register('name')} />
			</div>
			{/* поля для TPerson */}
			{formData.hasOwnProperty('birth_year') && (
				<>
					<div className={styles.wrapper}>
						<label htmlFor='birth_year'>Birth Year:</label>
						<input
							className={styles.input}
							id='birth_year'
							{...register('birth_year')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='height'>Height:</label>
						<input
							className={styles.input}
							id='height'
							{...register('height')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='mass'>Mass:</label>
						<input className={styles.input} id='mass' {...register('mass')} />
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='hair_color'>Hair color:</label>
						<input
							className={styles.input}
							id='hair_color'
							{...register('hair_color')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='skin_color'>Skin color:</label>
						<input
							className={styles.input}
							id='skin_color'
							{...register('skin_color')}
						/>
					</div>
				</>
			)}
			{/* поля для TPlanet */}
			{formData.hasOwnProperty('diameter') && (
				<>
					<div className={styles.wrapper}>
						<label htmlFor='diameter'>Diameter:</label>
						<input
							className={styles.input}
							id='diameter'
							{...register('diameter')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='rotationPeriod'>Rotation period:</label>
						<input
							className={styles.input}
							id='rotationPeriod'
							{...register('rotation_period')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='climate'>Climate:</label>
						<input
							className={styles.input}
							id='climate'
							{...register('climate')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='terrain'>Terrain:</label>
						<input
							className={styles.input}
							id='terrain'
							{...register('terrain')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='surface_water'>Surface water:</label>
						<input
							className={styles.input}
							id='surface_water'
							{...register('surface_water')}
						/>
					</div>
				</>
			)}
			{/* поля для TShip */}
			{formData.hasOwnProperty('model') && (
				<>
					<div className={styles.wrapper}>
						<label htmlFor='model'>Model:</label>
						<input className={styles.input} id='model' {...register('model')} />
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='starship_class'>Starship class:</label>
						<input
							className={styles.input}
							id='starship_class'
							{...register('starship_class')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='cost_in_credits'>Cost in credits:</label>
						<input
							className={styles.input}
							id='cost_in_credits'
							{...register('cost_in_credits')}
						/>
					</div>
					<div className={styles.wrapper}>
						<label htmlFor='length'>Length:</label>
						<input
							className={styles.input}
							id='length'
							{...register('length')}
						/>
					</div>
				</>
			)}
			<div className={styles.btnWrapper}>
				<button type='submit' className={styles.btn}>
					Save
				</button>
			</div>
		</form>
	)
}
