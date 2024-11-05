import React from 'react'

import { Planets } from './pages/Planets'
import { Ships } from './pages/Ships'
import { Route, Routes } from 'react-router-dom'
import { People } from './pages/People'
import { ElementDetails } from './components/ElementDetails/ElementDetails'
import Login from './components/Login/Login'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
	return (
		<Routes>
			<Route
				path='*'
				element={<div style={{ color: 'white' }}>Ups... Page not found</div>}
			/>
			<Route
				path='/login'
				element={
					<ProtectedRoute onlyUnAuth>
						<Login />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<People />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/planets'
				element={
					<ProtectedRoute>
						<Planets />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/ships'
				element={
					<ProtectedRoute>
						<Ships />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/details/:name'
				element={
					<ProtectedRoute>
						<ElementDetails />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
