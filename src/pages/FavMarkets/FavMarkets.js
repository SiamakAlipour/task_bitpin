import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Audio } from 'react-loader-spinner';

import Pagination from '@mui/material/Pagination';

import MarketCard from 'components/shared/MarketCard';
import { addFav, getFav } from 'store/actions/favMarkets';
import { allMarkets } from 'store/actions/market';

import '../Markets/Markets.scss';
import usePagination from 'hooks/usePagination';
import useFetch from 'hooks/useFetch';
import { setCookie } from 'utils/services/cookies';
import { getCookie } from 'utils/services/cookies';

const postPerPage = 9;

function FavMarkets({ cookie }) {
	const [favMarkets, setFavMarkets] = useState([]);
	const { data, error, loading } = useFetch('/mkt/markets');
	const { currentPosts, paginate } = usePagination(favMarkets, 9);

	const handleAdd = (code, market) => {
		setFavMarkets([market, ...favMarkets]);
		setCookie('fav', code, 30);
	};
	const handleRemove = (code) => {
		let cookies = getCookie('fav');
		let arr = favMarkets.filter((markets) => markets.code !== code);
		setFavMarkets([...arr]);
		console.log(arr);
		setCookie(
			'fav',
			cookies.filter((cookie) => cookie.code !== code)
		);
	};
	// adding to state what is in cookies
	useEffect(() => {
		cookie.forEach((fav) =>
			data?.forEach((market) => {
				const isFound = favMarkets.some((fav) => {
					if (fav.id === market.id) return true;
				});
				if (isFound) return;
				else if (!isFound && market.code === fav.code)
					setFavMarkets([...favMarkets, market]);
			})
		);
	}, [data, favMarkets, cookie]);

	return (
		<div className='container markets'>
			{favMarkets.length === 0 ? (
				<Audio height='100' width='100' color='grey' ariaLabel='loading' />
			) : (
				<>
					<div className='row justify-content-center'>
						<div className='wrap'></div>
						{currentPosts?.map((market) => (
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
	cookie: state.cookie,
});

// const mapDispatchToProps = (dispatch) => ({
// 	addFav: (market) => dispatch(addFav(market)),
// 	getFav: () => dispatch(getFav()),
// });

export default connect(mapStateToProps, null)(FavMarkets);
