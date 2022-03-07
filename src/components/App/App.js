import React from 'react';
import { Routes, Route } from 'react-router-dom';

import _404 from './_404';
import FavMarkets from './FavMarkets';
import Header from './Header';
import Markets from './Markets';
import Transactions from './Transactions';

import './App.scss';

function App() {
	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/' element={<Markets />} />
				<Route path='/markets/:code' element={<Transactions />} />
				<Route path='/favMarkets' element={<FavMarkets />} />
				<Route path='*' element={<_404 />} />
			</Routes>
		</div>
	);
}

export default App;
