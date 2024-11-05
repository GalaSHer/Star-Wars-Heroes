import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/slices/authSlice'
import { useSelector } from '../services/store'

type ProtectedRouteProps = {
	onlyUnAuth?: boolean
	children: React.ReactNode
}

export const ProtectedRoute = ({
	onlyUnAuth,
	children,
}: ProtectedRouteProps) => {
	const userAuth = useSelector(isAuthenticated)

	// правило для неавторизованных пользователей (на маршрутах для авторизованных пользователей)
	if (!onlyUnAuth && !userAuth) {
		return <Navigate to='/login' />
	}
	// правило для авторизованных пользователей (на маршрутах для неавторизованных пользователей)
	if (onlyUnAuth && userAuth) {
		return <Navigate to={'/'} replace />
	}

	return children
}
