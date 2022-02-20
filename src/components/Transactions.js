import React, { useState, useEffect } from 'react'
import './styles/Transactions.scss'
import { useParams } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { useSelector, useDispatch } from 'react-redux'
import TransactionsItem from './TransactionsItem'
import { allMarkets } from '../store/actions/market'
import { Chart } from 'react-chartjs-2'
import { UserData } from '../data'

function Transactions() {
	let params = useParams()
	const dispatch = useDispatch()
	const markets = useSelector((state) => state.markets)
	const [currencies, setCurrencies] = useState([])
	const [data, setData] = useState({
		labels: UserData.map((data) => data.year),
		datasets: [
			{
				label: 'Users Gained',
				data: UserData.map((data) => data.userGain),
			},
		],
	})
	const [market, setMarket] = useState([])
	const types = ['برداشت', 'واریز', 'معامله']
	const randomList = [...Array(Math.ceil(Math.random() * 10))].map(() => ({
		date: faker.date.weekday(),
		type: types[Math.floor(Math.random() * 3)],
		amount: faker.datatype.number(),
		description: faker.random.words(5),
	}))
	useEffect(() => {
		dispatch(allMarkets())
	}, [])
	const handleParams = () => {
		setCurrencies(params.code.split('_'))
		console.log(faker.date.past())
	}
	const handlePrice = (price) => {
		let nf = new Intl.NumberFormat()
		return nf.format(price)
	}
	useEffect(() => {
		const randomName = faker.name.findName()
		console.log(randomName)
		handleParams()
	}, [])
	useEffect(() => {
		markets.some((m) => {
			if (m.code === params.code) setMarket(m)
		})
		console.log(market)
	}, [market, markets])

	return (
		<div className='transactions container'>
			<div className='row'>
				<div className='transactions__currencyInfo'>
					<div
						className={`transactions__currencyName ${
							market.price_info?.change > 0 && 'positive'
						} `}>
						{market.title_fa}: {`${market.price_info?.change}%`}
					</div>
					<div className='transactions__currencyPrice'>
						آخرین قیمت : {handlePrice(market.price)}
					</div>
				</div>
				<table className='table table-striped table-dark table-hover'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Date</th>
							<th scope='col'>Transaction type</th>
							<th scope='col'>Amount</th>
							<th scope='col'>Description</th>
						</tr>
					</thead>
					<tbody>
						{randomList.map((list, index) => (
							<TransactionsItem
								key={index}
								id={index}
								date={list?.date}
								type={list.type}
								amount={list.amount}
								description={list.description}
							/>
						))}
					</tbody>
				</table>
				<Chart chartData={data} />
			</div>
		</div>
	)
}

export default Transactions
