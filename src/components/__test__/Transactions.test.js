import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from '../../store'
import Transactions from '../Transactions'

it('renders without crash', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<Transactions />
			</BrowserRouter>
		</Provider>,
		div
	)
})
