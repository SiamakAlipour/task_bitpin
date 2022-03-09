import React from 'react'
import ReactDOM from 'react-dom'
import TransactionsItem from '../TransactionsItem'

it('renders without crash', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<TransactionsItem
			id={1}
			date={new Date().toISOString()}
			type={'test'}
			amount={10000}
			description={'test description'}
		/>,

		div
	)
})
