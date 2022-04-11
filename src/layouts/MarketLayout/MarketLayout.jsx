/* eslint-disable react/require-default-props */
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types';

import Pagination from '@mui/material/Pagination';

import { POSTS_COUNT } from 'utils/constants';

import './MarketLayout.scss';

function MarketLayout({ markets, paginate, children, ...props }) {
  const navigate = useNavigate();

  const checkPage = useCallback(
    (page) => {
      const lastPage = Math.ceil(markets.length / POSTS_COUNT);
      if (page < 1 || page > lastPage) {
        return 1;
      }
      return null;
    },
    [markets.length],
  );

  useEffect(() => {
    if (props.fN) {
      navigate(`/favMarkets-${checkPage(parseInt(props.fN, 10)) || props.fN}`);
    } else if (props.pN) {
      navigate(`/page-${checkPage(parseInt(props.pN, 10)) || props.pN}`);
    }
  }, [props.pN, props.fN, navigate, checkPage]);

  return (
    <div className="container markets">
      {markets.length === 0 ? (
        <Audio height="100" width="100" color="grey" ariaLabel="loading" />
      ) : (
        <>
          <div className="row justify-content-center">{children}</div>

          <Pagination
            color="primary"
            count={Math.ceil(markets.length / POSTS_COUNT)}
            onChange={paginate}
          />
        </>
      )}
    </div>
  );
}

MarketLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  markets: PropTypes.array.isRequired,
  paginate: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  fN: PropTypes.number,
  pN: PropTypes.number,
};
export default MarketLayout;
