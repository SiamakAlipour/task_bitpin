import React, { useEffect, useState } from 'react'
import './styles/Markets.scss'

import MarketCard from './MarketCard'
import { Audio } from 'react-loader-spinner'
import Pagination from '@mui/material/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../store/actions/cookie'
import { addFav, getFav } from '../store/actions/favMarkets'
import { allMarkets } from '../store/actions/market'

function FavMarkets() {
	const dispatch = useDispatch()
	const cookie = useSelector((state) => state.cookie)
	const markets = useSelector((state) => state.markets)
	const favMarkets = useSelector((state) => state.favMarkets)
	const [favLoading, setFavLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(9)
	const indexOfLastPost = currentPage * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage
	const currentPosts = favMarkets.slice(indexOfFirstPost, indexOfLastPost)
	const paginate = (event, value) => setCurrentPage(value)
	React.useEffect(() => {
		dispatch(allMarkets())
		dispatch(getCookie())
		dispatch(getFav())
	}, [])
	useEffect(() => {
		cookie.map((fav) =>
			markets.find((market) => {
				const isFound = favMarkets.some((fav) => {
					if (fav.id === market.id) return true
				})
				if (isFound) return
				else if (!isFound && market.code === fav.code) dispatch(addFav(market))
			})
		)
	}, [markets, favMarkets, cookie])
	useEffect(() => {
		if (favMarkets.length > 0) setFavLoading(false)
		else setFavLoading(true)
	}, [favMarkets])
	return (
		<div className='container markets'>
			{favLoading ? (
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
								isLiked={true}
							/>
						))}
					</div>
					<Pagination
						color='primary'
						count={Math.ceil(favMarkets.length / postPerPage)}
						onChange={paginate}
					/>
				</>
			)}
		</div>
	)
}

export default FavMarkets
