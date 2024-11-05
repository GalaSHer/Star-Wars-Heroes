import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../services/slices/authSlice'
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'

type FormData = {
	username: string
	password: string
}

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = (data: FormData) => {
		if (data.username === 'admin' && data.password === 'password') {
			dispatch(login())
			navigate('/')
		} else {
			alert('Invalid login or password')
		}
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.wrapper}>
					<label htmlFor='username'>Username:</label>
					<input
						className={styles.input}
						id='username'
						{...register('username', { required: 'Username is required' })}
					/>
					{errors.username && (
						<p className={styles.error}>{errors.username.message}</p>
					)}
				</div>

				<div className={styles.wrapper}>
					<label htmlFor='password'>Password:</label>
					<input
						className={styles.input}
						type='password'
						id='password'
						{...register('password', { required: 'Password is required' })}
					/>
					{errors.password && (
						<p className={styles.error}>{errors.password.message}</p>
					)}
				</div>

				<div className={styles.btnWrapper}>
					<button type='submit' className={styles.btn}>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
