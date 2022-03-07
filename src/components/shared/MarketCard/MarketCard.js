import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';

import { handlePrice } from '@helpers';
import { addCookie, removeCookie } from '@store/actions/cookie';
import { addFav, removeFav } from '@store/actions/favMarkets';
import { allMarkets } from '@store/actions/market';

import './MarketCard.scss';

function MarketCard({
	allMarkets,
	addCookie,
	addFav,
	removeCookie,
	removeFav,
	id,
	code,
	price,
	price_info,
	title,
	title_fa,
	market,
	isLiked,
}) {
	const [liked, setLiked] = useState(isLiked);

	const handleLike = () => {
		setLiked(true);
		addCookie({ id, code });
		addFav(market);
	};
	const handleDisLike = () => {
		setLiked(false);
		// remove from cookies and fav markets
		removeCookie(code);
		removeFav(code);
		// after removing from fav markets fetch again
		allMarkets();
	};
	// handle price will seperate numbers by 3 1,234,232,232

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
	);
}

const mapDispatchToProps = (dispatch) => ({
	allMarkets: () => dispatch(allMarkets()),
	addCookie: (id, code) => dispatch(addCookie({ id, code })),
	addFav: (market) => dispatch(addFav(market)),
	removeCookie: (code) => dispatch(removeCookie(code)),
	removeFav: (code) => dispatch(removeFav(code)),
});
export default connect(null, mapDispatchToProps)(MarketCard);
