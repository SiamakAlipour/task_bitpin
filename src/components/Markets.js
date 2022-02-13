import React, { useEffect, useState } from 'react'
import './styles/Markets.scss'
import axios from '../service/axios'
import MarketCard from './MarketCard'
function Markets() {
	const [markets, setMarkets] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get('/mkt/markets')
				.then((res) => {
					setMarkets(res.data.results)
					console.log('markets', markets)
				})
				.catch((err) => console.log(err))
		}
		fetchData()
	}, [])
	return (
		<div className='markets'>
			{markets.map((market, index) => (
				<MarketCard
					key={market.id}
					c1={market.currency1}
					c2={market.currency2}
					code={market.code}
					internal_price_info={market.internal_price_info}
					order_book_info={market.order_book_info}
					otc_buy_percent={market.otc_buy_percent}
					otc_market={market.otc_market}
					otc_max_buy_amount={market.otc_max_buy_amount}
					otc_max_sell_amount={market.otc_max_sell_amount}
					otc_sell_percent={market.otc_sell_percent}
					price={market.price}
					price_info={market.price_info}
					title={market.title}
					title_fa={market.title_fa}
					tradable={market.tradable}
					trading_view_source={market.trading_view_source}
				/>
			))}
		</div>
	)
}

export default Markets
