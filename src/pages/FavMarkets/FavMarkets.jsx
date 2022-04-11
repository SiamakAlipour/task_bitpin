import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MarketCard from 'components/shared/MarketCard';
import usePagination from 'hooks/usePagination';
import MarketLayout from 'layouts/MarketLayout';
import { getMarkets, toggleFavorite } from 'store/actions/market';
import { setCookie, getCookie } from 'utils/services/cookies';

// eslint-disable-next-line no-shadow
function FavMarkets({ markets, getMarkets, toggleFavorite }) {
  const { favNumber } = useParams();

  const [favMarkets, setFavMarkets] = useState([]);

  const { currentPosts, currentPage, paginate } = usePagination(favMarkets, favNumber || 1);

  useEffect(() => {
    getMarkets();
  }, [getMarkets]);

  const handleRemove = (id) => {
    const newArray = favMarkets.filter((fav) => fav.id !== id);
    toggleFavorite(id);
    setFavMarkets(newArray);
    const cookies = getCookie('fav') || [];
    setCookie(
      'fav',
      cookies.filter((cookie) => cookie.id !== id),
    );
  };

  useEffect(() => {
    markets.forEach((market) => {
      const isExist = favMarkets.some((fav) => fav.id === market.id);
      if (market.liked && !isExist) {
        setFavMarkets([...favMarkets, market]);
      }
    });
  }, [markets, favMarkets]);
  return (
    <MarketLayout markets={favMarkets} paginate={paginate} fN={currentPage}>
      {currentPosts.map((market) => (
        <MarketCard
          key={market.id}
          id={market.id}
          code={market.code}
          liked={market.liked}
          title={market.title}
          title_fa={market.title_fa}
          price_info={market.price_info}
          price={market.price}
          market={market}
          addFav={() => null}
          removeFav={handleRemove}
        />
      ))}
    </MarketLayout>
  );
}

const mapStateToProps = (state) => ({
  markets: state.markets,
});

const mapDispatchToProps = (dispatch) => ({
  getMarkets: () => dispatch(getMarkets()),
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
});

FavMarkets.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  markets: PropTypes.array.isRequired,
  getMarkets: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(FavMarkets);
