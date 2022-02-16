import React, { useEffect, useState } from 'react'
import './styles/Markets.scss'
import axios from '../service/axios'
import MarketCard from './MarketCard'
import { Audio } from 'react-loader-spinner'
import Pagination from '@mui/material/Pagination'
import { getCookie } from '../service/cookies'
import { useDispatch, useSelector } from 'react-redux'
import { getFav } from '../store/actions/fav'
import { useLocation } from 'react-router-dom'
import { InsertLinkRounded } from '@mui/icons-material'
function Markets() {
	const dispatch = useDispatch()
	const location = useLocation()
	const fav = useSelector((state) => state.fav)
	const [markets, setMarkets] = useState([])
	const [favMarkets, setFavMarkets] = useState([])
	const [loadingMarket, setLoadingMarket] = useState(true)
	const [favLoading, setFavLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(9)
	const fetchData = async () => {
		await axios
			.get('/mkt/markets')
			.then((res) => {
				setMarkets(res.data.results)
				setLoadingMarket(false)
				console.log('markets', markets)
			})
			.catch((err) => console.log(err))
	}
	useEffect(() => {
		fetchData()
	}, [])
	useEffect(() => {
		console.log('testtttting ', markets, favMarkets)
	}, [])
	useEffect(() => {
		// fetching data

		if (location.pathname === '/likedMarkets' && fav.length > 0) {
			setFavLoading(false)
			fav.map((fav) =>
				markets.find((market) => {
					if (!favMarkets?.includes(market) && market.code === fav.code)
						setFavMarkets([...favMarkets, market])
				})
			)
		}
	}, [location.pathname, markets])

	// vars for pagination
	const indexOfLastPost = currentPage * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage
	let currentPosts
	if (location.pathname === '/likedMarkets') {
		currentPosts = favMarkets?.slice(indexOfFirstPost, indexOfLastPost)
	} else {
		currentPosts = markets?.slice(indexOfFirstPost, indexOfLastPost)
	}

	// metrial ui pagination func
	const paginate = (event, value) => setCurrentPage(value)
	React.useEffect(() => {
		dispatch(getFav())
		console.log('hello', fav)
	}, [])
	// useEffect(() => {
	// 	if (isLiked(markets[0])) {
	// 		console.log(1)
	// 	} else {
	// 		console.log(markets[0], fav[0])
	// 		console.log(0)
	// 	}
	// }, [markets])
	const isLiked = (market) => {
		const isFind = fav.find((fav) => {
			if (fav.code === market.code) {
				return true
			}
		})

		if (isFind) {
			console.log('this is fav')
			return true
		} else return false
	}
	// sending loading
	const marketsFunc = (loading) => {
		return loading ? (
			<Audio height='100' width='100' color='grey' ariaLabel='loading' />
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
							market={market}
							isLiked={isLiked(market)}
						/>
					))}
				</div>
				<Pagination
					color='primary'
					count={
						location.pathname === '/likedMarkets'
							? Math.ceil(fav.length / postPerPage)
							: Math.ceil(markets.length / postPerPage)
					}
					onChange={paginate}
				/>
			</>
		)
	}

	return (
		<div className='container markets'>
			{location.pathname === '/likedMarkets'
				? marketsFunc(favLoading)
				: marketsFunc(loadingMarket)}
		</div>
	)
}

export default Markets
