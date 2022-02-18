import React, { useEffect, useState } from 'react'
import './styles/Markets.scss'
import axios from '../service/axios'
import MarketCard from './MarketCard'
import { Audio } from 'react-loader-spinner'
import Pagination from '@mui/material/Pagination'

import { useDispatch, useSelector } from 'react-redux'

function Markets() {
	const dispatch = useDispatch()
	const [markets, setMarkets] = useState([])
	const [loadingMarket, setLoadingMarket] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(9)
	const fetchData = async () => {}
	useEffect(() => {
		fetchData()
	}, [])
	useEffect(() => {
		console.log('hey ', fav)
	}, [])

	// vars for pagination
	const indexOfLastPost = currentPage * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage

	const currentPosts = markets?.slice(indexOfFirstPost, indexOfLastPost)

	// metrial ui pagination func
	const paginate = (event, value) => setCurrentPage(value)

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

export default Markets
