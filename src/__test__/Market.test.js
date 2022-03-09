import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import Markets from '../Markets'

it('renders without crash', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<Markets />
		</Provider>,
		div
	)
})
