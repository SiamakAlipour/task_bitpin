import React, { useReducer, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import { getMarkets } from 'store/actions/market';
import { formatPrice } from 'utils/helpers';

import Chart from './Chart';
import TransactionsItem from './TransactionsItems';

import './Transactions.scss';

const marketsReducer = (state, action) => {
  switch (action.type) {
    case 'MARKET_FETCH_INIT':
      return {
        ...state,
        isFind: false,
      };
    case 'MARKET_FETCH_SUCCESS':
      return { ...state, data: action.payload, isFind: true };
    default:
      throw new Error();
  }
};
/* eslint-disable-next-line no-shadow */
function Transactions({ getMarkets, markets }) {
  const params = useParams();

  const [market, dispatch] = useReducer(marketsReducer, {
    data: [],
    isFind: true,
  });

  const types = ['برداشت', 'واریز', 'معامله'];

  const randomList = [...Array(Math.ceil(Math.random() * 10))].map(() => ({
    id: v4(),
    date: faker.date.weekday(),
    type: types[Math.floor(Math.random() * 3)],
    amount: faker.datatype.number(),
    description: faker.random.words(5),
  }));

  // fetch markets
  useEffect(() => {
    getMarkets();
  }, [getMarkets]);

  // finding the market to show price and changes
  useEffect(() => {
    dispatch({
      type: 'MARKET_FETCH_INIT',
    });
    markets.forEach((marketItem) => {
      if (marketItem.code === params.code) {
        dispatch({
          type: 'MARKET_FETCH_SUCCESS',
          payload: marketItem,
        });
      }
    });
  }, [markets, params.code]);

  if (!market.isFind) {
    return <Navigate to="/404" />;
  }
  return (
    <div className="transactions container">
      <div className="row">
        <div className="transactions__currency-info">
          <div
            className={`transactions__currency-name ${
              market.data.price_info.change > 0 && 'transactions__currency-name--positive'
            } `}
          >
            {market.data.title_fa}: {`${market.data.price_info.change}%`}
          </div>
          <div className="transactions__currency-price">
            آخرین قیمت : {formatPrice(market.data.price)}
          </div>
        </div>
        <table className="transactions__table table table-striped table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Transaction type</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {randomList.map((list, index) => (
              <TransactionsItem
                key={list.id}
                id={index}
                date={list.date}
                type={list.type}
                amount={list.amount}
                description={list.description}
              />
            ))}
          </tbody>
        </table>
        <div className="transactions__chart">
          <Chart />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  markets: state.markets,
});

const mapDispatchToProps = (dispatch) => ({
  getMarkets: () => dispatch(getMarkets()),
});

Transactions.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  markets: PropTypes.array.isRequired,
  getMarkets: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
