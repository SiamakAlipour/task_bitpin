import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/App/Header/Header';
import _404 from '../_404';
import Markets from './Markets/Markets';
import Transactions from './Transactions/Transactions';
import FavMarkets from './Favmarkets/FavMarkets';
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
