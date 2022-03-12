import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import Pagination from '@mui/material/Pagination';

import MarketCard from 'components/shared/MarketCard';

import { toggleFavorite, getMarkets } from 'store/actions/market';

import usePagination from 'hooks/usePagination';

import './Markets.scss';
import { getCookie, setCookie } from 'utils/services/cookies';

const postPerPage = 9;

function Markets({ getMarkets, markets, cookie, toggleFavorite }) {
	const { currentPosts, paginate } = usePagination(markets, postPerPage);
	useEffect(() => {
		getMarkets();
	}, []);

	const handleAdd = (id, market) => {
		toggleFavorite(id);
		const cookie = getCookie('fav') ? getCookie('fav') : [];
		setCookie('fav', [...cookie, { id }], 30);
	};
	const handleRemove = (id) => {
		toggleFavorite(id);
		const cookie = getCookie('fav') ? getCookie('fav') : [];
		const newCookie = cookie.filter((cookie) => cookie.id !== id);
		setCookie('fav', newCookie, 30);
	};
	return (
		<div className='container markets'>
			{markets?.length === 0 ? (
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
								market={market}
								isLiked={market.liked}
								addFav={handleAdd}
								removeFav={handleRemove}
							/>
						))}
					</div>
					<Pagination
						color='primary'
						count={Math.ceil(markets?.length / postPerPage)}
						onChange={paginate}
					/>
				</>
			)}
		</div>
	);
}
const mapStateToProps = (state) => ({
	markets: state.markets,
	cookie: state.cookie,
});
const mapDispatchToProps = (dispatch) => ({
	getMarkets: () => dispatch(getMarkets()),
	getCookie: () => dispatch(getCookie()),
	toggleFavorite: (id) => dispatch(toggleFavorite(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Markets);
