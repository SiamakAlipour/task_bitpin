import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';

import { handlePrice } from 'utils/helpers';

import './MarketCard.scss';

import { useSelector } from 'react-redux';

function MarketCard({ removeFav, addFav, ...props }) {
	const [liked, setLiked] = useState(props.isLiked);
	const cookie = useSelector((state) => state.cookie);
	const handleLike = () => {
		setLiked(true);
		addFav(props.id, props.market);
	};
	const handleDisLike = () => {
		setLiked(false);
		removeFav(props.id);
	};
	// handle price will seperate numbers by 3 1,234,232,232

	return (
		<div className={`marketCard ${liked && 'liked'}`}>
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
