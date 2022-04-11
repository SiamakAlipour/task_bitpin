/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';

import { formatPrice } from 'utils/helpers';

import './MarketCard.scss';

function MarketCard({ removeFav, addFav, ...props }) {
  const [liked, setLiked] = useState(props.liked);
  const handleLike = () => {
    setLiked(true);
    addFav(props.id, props.market);
  };
  const handleDisLike = () => {
    setLiked(false);
    removeFav(props.id);
  };
  return (
    <div className={`market-card ${liked && 'liked'}`}>
      <div className="market-card__title">
        <p>{props.title_fa}</p>
        <p>{props.title}</p>
      </div>

      <div className="market-card__price">
        <p className={props.price_info.change > 0 ? 'text-success' : 'text-danger'}>
          {props.price_info.change}
        </p>
        <p>{formatPrice(props.price)}</p>
      </div>
      <div className="market-card__footer">
        <p className="market-card__market-list">
          <Link to={`/markets/${props.code}`}>لیست معاملات</Link>
        </p>
        {liked ? (
          <IconButton color="warning" onClick={handleDisLike}>
            <StarIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={handleLike}>
            <StarBorderIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

MarketCard.propTypes = {
  addFav: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  market: PropTypes.object.isRequired,
  price_info: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  removeFav: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  title_fa: PropTypes.string.isRequired,
};
export default MarketCard;
