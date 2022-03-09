import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store'
import FavMarkets from '../FavMarkets'

it('renders without crash', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<FavMarkets />
		</Provider>,
		div
	)
})
