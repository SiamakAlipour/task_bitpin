import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import Pagination from '@mui/material/Pagination';

import MarketCard from '@shared/MarketCard';
import { addFav } from '@store/actions/favMarkets';
import { allMarkets } from '@store/actions/market';

import './Markets.scss';

const postPerPage = 9;

function Markets({ allMarkets, markets, addFav, cookie, favMarkets }) {
	const [marketsItems, setMarketsItems] = useState(null);
	// const [loadingMarket, setLoadingMarket] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	// updating prices every 5 seconds
	useEffect(() => {
		allMarkets();
		const interval = setInterval(() => {
			allMarkets();
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (cookie) {
			cookie.forEach((fav) =>
				markets.forEach((market) => {
					// check if already exist in fav markets
					const isFound = favMarkets.some((fav) => fav.code === market.code);

					//  if not exist add it to fav markets
					if (!isFound && market.code === fav.code) {
						return addFav(market);
					}
				})
			);
		}
		if (favMarkets) {
			favMarkets.forEach((fav) => {
				const indexOfObject = markets.findIndex((market) => {
					return market.code === fav.code;
				});
				// if exist then remove
				if (indexOfObject > -1) {
					markets.splice(indexOfObject, 1);
				}
			});
		}

		// show fav markets first then markets
		if (favMarkets.length > 0) {
			setMarketsItems([...favMarkets, ...markets]);
		} else {
			setMarketsItems([...markets]);
		}
	}, [markets, favMarkets, cookie]);

	//  vars for pagination
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPosts = marketsItems?.slice(indexOfFirstPost, indexOfLastPost);
	// metrial ui pagination func
	const paginate = (event, value) => setCurrentPage(value);

	const isLiked = (market) => {
		const isFind = cookie.some((cookie) => cookie.code === market.code);
		if (isFind) {
			return true;
		} else return false;
	};

	return (
		<div className='container markets'>
			{marketsItems === null ? (
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
								market={market}
								isLiked={isLiked(market)}
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
	favMarkets: state.favMarkets,
	cookie: state.cookie,
});
const mapDispatchToProps = (dispatch) => ({
	allMarkets: () => dispatch(allMarkets()),
	addFav: (market) => dispatch(addFav(market)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Markets);
