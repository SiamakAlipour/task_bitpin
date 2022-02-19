import React, { useState, useEffect } from 'react'
import './styles/MarketCard.scss'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCookie, removeCookie } from '../store/actions/cookie'
import { addFav, removeFav } from '../store/actions/favMarkets'
import { getCookie } from '../service/cookies'
import { addMarket, allMarkets } from '../store/actions/market'
function MarketCard({
	id,
	code,
	price,
	price_info,
	title,
	title_fa,
	tradable,
	market,
	isLiked,
}) {
	const [liked, setLiked] = useState(isLiked)
	const dispatch = useDispatch()
	const handleLike = () => {
		setLiked(true)
		dispatch(addCookie({ id, code }))
		dispatch(addFav(market))
	}
	const handleDisLike = () => {
		setLiked(false)
		// remove from cookies and fav markets
		dispatch(removeCookie(id))
		dispatch(removeFav(id))
		// after removing from fav markets fetch again
		dispatch(allMarkets())
	}

	const handlePrice = (price) => {
		let nf = new Intl.NumberFormat()
		return nf.format(price)
	}
	return (
		<div className={`marketCard ${isLiked && 'liked'}`}>
			<div className='marketCard__title'>
				<p>{title_fa}</p>
				<p>{title}</p>
			</div>

			<div className='marketCard__price'>
				<p className={price_info.change > 0 ? 'text-success' : 'text-danger'}>
					{price_info.change}
				</p>
				<p>{handlePrice(price)}</p>
			</div>
			<div className='marketCard__footer'>
				<p className='marketCard__footerMarketList'>
					<Link to={`/markets/${code}`}>لیست معاملات</Link>
				</p>
				{liked ? (
					<IconButton color='warning' onClick={handleDisLike}>
						<StarIcon />
					</IconButton>
				) : (
					<IconButton color='primary' onClick={handleLike}>
						<StarBorderIcon />
					</IconButton>
				)}
			</div>
		</div>
	)
}

export default MarketCard
