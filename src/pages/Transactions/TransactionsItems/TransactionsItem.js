import React from 'react';
import PropTypes from 'prop-types';

import './TransactionsItem.scss';

function TransactionsItem({ id, date, type, amount, description }) {
	return (
		<tr className='transactionsItem'>
			<th scope='row'>{id + 1}</th>
			<td>{date.toString()}</td>
			<td>{type}</td>
			<td>{amount}</td>
			<td>{description}</td>
		</tr>
	);
}

TransactionsItem.propTypes = {
	id: PropTypes.string,
	date: PropTypes.string,
	type: PropTypes.oneOf(['برداشت', 'واریز', 'معامله']),
	amount: PropTypes.number,
	description: PropTypes.string,
};

export default TransactionsItem;
