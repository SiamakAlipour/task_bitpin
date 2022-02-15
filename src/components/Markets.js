import React, { useEffect, useState } from 'react'
import './styles/Markets.scss'
import axios from '../service/axios'
import MarketCard from './MarketCard'
import { Audio } from 'react-loader-spinner'
import Pagination from '@mui/material/Pagination'
import { getCookie } from '../service/cookies'
import { useDispatch, useSelector } from 'react-redux'
import { getFav } from '../store/actions/fav'
function Markets() {
	const dispatch = useDispatch()
	const fav = useSelector((state) => state.fav)
	const [markets, setMarkets] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(9)

	useEffect(() => {
		// fetching data
		const fetchData = async () => {
			await axios
				.get('/mkt/markets')
				.then((res) => {
					setMarkets(res.data.results)
					setLoading(false)
					console.log('markets', markets)
				})
				.catch((err) => console.log(err))
		}
		fetchData()
	}, [])
	// vars for pagination
	const indexOfLastPost = currentPage * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage
	const currentPosts = markets?.slice(indexOfFirstPost, indexOfLastPost)
	// metrial ui pagination func
	const paginate = (event, value) => setCurrentPage(value)
	React.useEffect(() => {
		dispatch(getFav())
		console.log('hello', fav)
	}, [])
	return (
		<div className='container markets'>
			{loading ? (
				<Audio heigth='100' width='100' color='grey' ariaLabel='loading' />
			) : (
				<>
					<div className='row justify-content-center'>
						<div className='wrap'></div>
						{currentPosts.map((market) => (
							<MarketCard
								key={market.id}
								id={market.id}
								code={market.code}
								price={market.price}
								price_info={market.price_info}
								title={market.title}
								title_fa={market.title_fa}
								tradable={market.tradable}
							/>
						))}
					</div>
					<Pagination
						color='primary'
						count={Math.ceil(markets.length / postPerPage)}
						onChange={paginate}
					/>
				</>
			)}
		</div>
	)
}

export default Markets
