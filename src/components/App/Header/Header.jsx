import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <h2 className="header__title">مینی صرافی</h2>
      <ul className="header__menu">
        <li>
          <Link to="/">خانه</Link>
        </li>

        <li>
          <Link to="/favMarkets">مارکت های مورد علاقه</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
