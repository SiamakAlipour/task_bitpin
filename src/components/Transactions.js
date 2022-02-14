import React from 'react'
import './styles/Transactions.scss'
import { useParams } from 'react-router-dom'

function Transactions() {
	let params = useParams()
	React.useEffect(() => {
		console.log(params.code)
	}, [])
	return (
		<div className='transactions'>
			<h1 className='text-danger'>{params.code}</h1>
		</div>
	)
}

export default Transactions
