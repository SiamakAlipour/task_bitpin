import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import _404 from './components/_404'
import Markets from './components/Markets'
import Transactions from './components/Transactions'
import FavMarkets from './components/FavMarkets'
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
	)
}

export default App
