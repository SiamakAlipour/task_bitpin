import React, { useState, useEffect } from 'react'
import './styles/MarketCard.scss'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
function MarketCard({ code, price, price_info, title, title_fa, tradable }) {
	const [liked, setLiked] = useState(false)
	return (
		<div className='marketCard'>
			<div className='marketCard__title'>
				<p>{title_fa}</p>
				<p>{title}</p>
			</div>

			<div className='marketCard__price'></div>
			<div className='marketCard__footer'>
				<p className='marketCard__footerMarketList'>
					<Link to={`/markets/${code}`}>لیست معاملات</Link>
				</p>
				{liked ? (
					<IconButton color='warning' onClick={() => setLiked(false)}>
						<StarIcon />
					</IconButton>
				) : (
					<IconButton color='primary' onClick={() => setLiked(true)}>
						<StarBorderIcon />
					</IconButton>
				)}
			</div>
		</div>
	)
}

export default MarketCard
