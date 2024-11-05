import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css'

export const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.headerNav}>
				<Link className={styles.headerLink} to='/'>
					Star Wars Persons
				</Link>
				<Link className={styles.headerLink} to='/planets'>
					Star Wars Planets
				</Link>
				<Link className={styles.headerLink} to='/ships'>
					Starships
				</Link>
			</nav>
		</header>
	)
}
