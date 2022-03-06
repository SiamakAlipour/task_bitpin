import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

import { allMarkets } from '../store/actions/market';
import axios from '../service/axios';
import TransactionsItem from './TransactionsItem';
import _404 from './_404';
import './Transactions.scss';
import 'chart.js/auto';
import { handlePrice } from '../../../Helpers';

function Transactions({ allMarkets, cookie, markets }) {
	let params = useParams();
	const [charts, setCharts] = useState([]);
	const [market, setMarket] = useState([]);
	const [isFind, setIsFind] = useState(false);
	const types = ['برداشت', 'واریز', 'معامله'];
	const randomList = [...Array(Math.ceil(Math.random() * 10))].map(() => ({
		date: faker.date.weekday(),
		type: types[Math.floor(Math.random() * 3)],
		amount: faker.datatype.number(),
		description: faker.random.words(5),
	}));

	// fetch markets
	useEffect(() => {
		allMarkets();
	}, []);
	useEffect(() => {
		(async () => {
			await axios.get('/mkt/markets/charts').then((res) =>
				res.data.results.forEach((data) => {
					if (data.code === params.code) {
						return setCharts(data.chart);
					}
				})
			);
		})();
	}, []);
	// finding the market to show price and changes
	useEffect(() => {
		markets.forEach((m) => {
			if (m.code === params.code) setMarket(m);
		});
	}, [markets]);

	useEffect(() => {
		const isFound = markets.some((data) => data.code === params.code);
		setIsFind(isFound);
	}, [isFind, params.code, markets]);

	return isFind ? (
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
				<div className='transactions__chart'>
					<Line
						data={{
							labels: charts.map((data) =>
								new Date(data.created_at * 1000).toLocaleTimeString()
							),
							datasets: [
								{
									label: params.code,
									data: charts.map((data) => data.price),
									backgroundColor: 'rgb(255, 238, 88)',
									borderColor: 'rgb(255, 238, 88)',
									color: '#FFF',
								},
							],
						}}
					/>
				</div>
			</div>
		</div>
	) : (
		<_404 />
	);
}

const mapStateToProps = (state) => ({
	cookie: state.cookie,
	markets: state.markets,
});

const mapDispatchToProps = (dispatch) => ({
	allMarkets: () => dispatch(allMarkets()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
