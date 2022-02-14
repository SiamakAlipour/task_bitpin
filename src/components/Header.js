import React from 'react'
import './styles/Header.scss'
import { Link } from 'react-router-dom'

function Header() {
	return (
		<header className='header'>
			<h2 className='header__title'>مینی صرافی</h2>
			<ul className='header__menu'>
				<li>
					<Link to='/'>خانه</Link>
				</li>

				<li>
					<Link to='/likedMarkets'>مارکت ها</Link>
				</li>
				<li>
					<Link to='/charts'>نمودار ها</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
