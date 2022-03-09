import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';

import { handlePrice } from 'utils/helpers';
import { addCookie, removeCookie } from 'store/actions/cookie';
import { addFav, removeFav } from 'store/actions/favMarkets';
import { allMarkets } from 'store/actions/market';

import './MarketCard.scss';

function MarketCard({ removeFav, addFav, ...props }) {
	const [liked, setLiked] = useState(props.isLiked);

	const handleLike = () => {
		setLiked(true);
		addFav(props.code, props.market);
	};
	const handleDisLike = () => {
		setLiked(false);
		removeFav(props.code);
	};
	// handle price will seperate numbers by 3 1,234,232,232

	return (
		<div className={`marketCard ${props.isLiked && 'liked'}`}>
			<div className='marketCard__title'>
				<p>{props.title_fa}</p>
				<p>{props.title}</p>
			</div>

			<div className='marketCard__price'>
				<p
					className={
						props.price_info.change > 0 ? 'text-success' : 'text-danger'
					}>
					{props.price_info.change}
				</p>
				<p>{handlePrice(props.price)}</p>
			</div>
			<div className='marketCard__footer'>
				<p className='marketCard__footerMarketList'>
					<Link to={`/markets/${props.code}`}>لیست معاملات</Link>
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
	);
}

export default MarketCard;
