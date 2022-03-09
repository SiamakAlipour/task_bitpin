import React from 'react';

import Header from './Header';
import Routes from 'routes';

import './App.scss';

function App() {
	return (
		<div className='app'>
			<Header />
			<Routes />
		</div>
	);
}

export default App;
