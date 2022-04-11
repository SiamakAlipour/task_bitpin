/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import _404 from 'pages/_404';
import FavMarkets from 'pages/FavMarkets';
import Markets from 'pages/Markets';
import Transactions from 'pages/Transactions';

function index() {
  return (
    <Routes>
      <Route path="/" element={<Markets />} />
      <Route path="/page-:pageNumber" element={<Markets />} />
      <Route path="/markets/:code" element={<Transactions />} />
      <Route path="/favMarkets" element={<FavMarkets />} />
      <Route path="/favMarkets-:favNumber" element={<FavMarkets />} />
      <Route path="*" element={<_404 />} />
    </Routes>
  );
}

export default index;
