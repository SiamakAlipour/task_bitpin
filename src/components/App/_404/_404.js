import React from 'react'
import './styles/_404.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
function _404() {
	return (
		<div className='_404'>
			<h1>
				4
				<span>
					<FontAwesomeIcon icon={faGhost} />{' '}
				</span>
				4
			</h1>
			<h2>Error: 404 page not found</h2>
			<p>Sorry, the page you're looking for cannot be accessed</p>
		</div>
	)
}

export default _404
