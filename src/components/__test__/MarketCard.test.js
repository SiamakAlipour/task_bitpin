import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store'
import MarketCard from '../MarketCard'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<MarketCard
					id={1}
					code={'TEST_TEST'}
					price={5000}
					price_info={{ change: 5 }}
					title={'test'}
					title_fa={'test'}
					market={{ test: 'test' }}
					isLiked={true}
				/>
			</BrowserRouter>
		</Provider>,
		div
	)
})
