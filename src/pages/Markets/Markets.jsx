import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import MarketCard from 'components/shared/MarketCard';
import usePagination from 'hooks/usePagination';
import MarketLayout from 'layouts/MarketLayout';
import { toggleFavorite, getMarkets } from 'store/actions/market';
import { getCookie, setCookie } from 'utils/services/cookies';

// eslint-disable-next-line no-shadow
function Markets({ markets, getMarkets, toggleFavorite }) {
  const { pageNumber } = useParams();

  const { currentPosts, currentPage, paginate } = usePagination(markets, pageNumber || 1);

  useEffect(() => {
    getMarkets();
  }, [getMarkets]);

  // eslint-disable-next-line no-unused-vars
  const handleAdd = (id, market) => {
    toggleFavorite(id);
    const cookie = getCookie('fav') || [];
    setCookie('fav', [...cookie, { id }], 30);
  };

  const handleRemove = (id) => {
    toggleFavorite(id);
    const cookie = getCookie('fav') || [];
    setCookie(
      'fav',
      // eslint-disable-next-line no-shadow
      cookie.filter((cookie) => cookie.id !== id),
      30,
    );
  };
  return (
    <MarketLayout markets={markets} paginate={paginate} pN={currentPage}>
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
          addFav={handleAdd}
          removeFav={handleRemove}
        />
      ))}
    </MarketLayout>
  );
}

const mapStateToProps = (state) => ({
  markets: state.markets,
  cookie: state.cookie,
});

const mapDispatchToProps = (dispatch) => ({
  getMarkets: () => dispatch(getMarkets()),
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
});

Markets.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  markets: PropTypes.array.isRequired,
  getMarkets: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Markets);
