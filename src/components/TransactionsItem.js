import React from 'react'
import './styles/TransactionsItem.scss'
function TransactionsItem({ id, date, type, amount, description }) {
	console.log(type)
	return (
		<tr className='transactionsItem'>
			<th scope='row'>{id + 1}</th>
			<td>{date.toString()}</td>
			<td>{type}</td>
			<td>{amount}</td>
			<td>{description}</td>
		</tr>
	)
}

export default TransactionsItem
