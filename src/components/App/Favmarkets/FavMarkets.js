import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Audio } from 'react-loader-spinner';

import Pagination from '@mui/material/Pagination';

import MarketCard from 'components/shared/MarketCard';
import { addFav } from 'store/actions/favMarkets';
import { allMarkets } from 'store/actions/market';

import '../Markets/Markets.scss';

const postPerPage = 9;

function FavMarkets({ allMarkets, cookie, markets, favMarkets }) {
	// const [favLoading, setFavLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPosts = favMarkets.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (event, value) => setCurrentPage(value);
	useEffect(() => {
		allMarkets();
	}, []);
	// adding to state what is in cookies
	useEffect(() => {
		cookie.forEach((fav) =>
			markets.forEach((market) => {
				const isFound = favMarkets.some((fav) => {
					if (fav.id === market.id) return true;
				});
				if (isFound) return;
				else if (!isFound && market.code === fav.code) addFav(market);
			})
		);
	}, [markets, favMarkets, cookie]);
	// setting loading false if we found fav markets
	// useEffect(() => {
	// 	if (favMarkets.length > 0) setFavLoading(false);
	// 	else setFavLoading(true);
	// }, [favMarkets]);
	return (
		<div className='container markets'>
			{markets === null ? (
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
							/>
						))}
					</div>
					<Pagination
						color='primary'
						count={Math.ceil(favMarkets.length / postPerPage)}
						onChange={paginate}
					/>
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	favMarkets: state.favMarkets,
	markets: state.markets,
	cookie: state.cookie,
});

const mapDispatchToProps = (dispatch) => ({
	allMarkets: () => dispatch(allMarkets()),
	addFav: (market) => dispatch(addFav(market)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavMarkets);
