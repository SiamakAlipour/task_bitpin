import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Audio } from 'react-loader-spinner';

import Pagination from '@mui/material/Pagination';

import MarketCard from 'components/shared/MarketCard';

import usePagination from 'hooks/usePagination';
import { getMarkets } from 'store/actions/market';
import { setCookie } from 'utils/services/cookies';
import { getCookie } from 'utils/services/cookies';

import '../Markets/Markets.scss';

const postPerPage = 9;

function FavMarkets({ getMarkets, markets }) {
	const [favMarkets, setFavMarkets] = useState([]);

	const { currentPosts, paginate } = usePagination(favMarkets, 9);
	useEffect(() => {
		getMarkets();
	}, []);
	const handleAdd = (id, market) => {
		setFavMarkets([market, ...favMarkets]);
		setCookie('fav', id, 30);
	};
	const handleRemove = (id) => {
		let cookies = getCookie('fav');
		let arr = favMarkets.filter((markets) => markets.id !== id);
		setFavMarkets(arr);
		console.log(arr);
		setCookie(
			'fav',
			cookies.filter((cookie) => cookie.id !== id)
		);
	};
	useEffect(() => {
		markets.forEach((market) => {
			if (market.liked === true) {
				setFavMarkets([...favMarkets, market]);
			}
		});
	}, [markets]);
	// adding to state what is in cookies
	// useEffect(() => {
	// 	console.log(cookie);
	// 	cookie.forEach((fav) =>
	// 		markets?.forEach((market) => {
	// 			const isFound = favMarkets.some((fav) => {
	// 				if (fav.id === market.id) return true;
	// 			});
	// 			if (isFound) return;
	// 			else if (!isFound && market.id === fav.id)
	// 				setFavMarkets([...favMarkets, market]);
	// 		})
	// 	);
	// }, [markets, cookie, favMarkets]);

	return (
		<div className='container markets'>
			{favMarkets.length === 0 ? (
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
								removeFav={handleRemove}
							/>
						))}
					</div>
					<Pagination
						color='primary'
						count={Math.ceil(favMarkets?.length / postPerPage)}
						onChange={paginate}
					/>
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	markets: state.markets,
});

const mapDispatchToProps = (dispatch) => ({
	getMarkets: () => dispatch(getMarkets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavMarkets);
