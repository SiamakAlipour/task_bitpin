import React, { useEffect, useState } from 'react'
import './styles/Markets.scss'

import MarketCard from './MarketCard'
import { Audio } from 'react-loader-spinner'
import Pagination from '@mui/material/Pagination'
import { useDispatch, useSelector } from 'react-redux'

function FavMarkets() {
	const fav = useSelector((state) => state.fav)
	const markets = useSelector((state) => state.markets)
	const [favLoading, setFavLoading] = useState(true)
	const [favMarkets, setFavMarkets] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(9)
	const indexOfLastPost = currentPage * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage
	const currentPosts = favMarkets?.slice(indexOfFirstPost, indexOfLastPost)
	React.useEffect(() => {
		dispatch(getFav())
		console.log('hello', fav)
	}, [])
	useEffect(() => {
		setFavLoading(false)
		fav.map((fav) =>
			markets.find((market) => {
				if (!favMarkets?.includes(market) && market.code === fav.code)
					setFavMarkets([...favMarkets, market])
			})
		)
	}, [markets])
	return (
		<div className='container markets'>
			{loadingMarket ? (
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
			)}
		</div>
	)
}

export default FavMarkets
