import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import _404 from './components/_404'
import Home from './components/Home'
import Markets from './components/Markets'
import Transactions from './components/Transactions'
import { useParams } from 'react-router-dom'
function App() {
	let params = useParams()
	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/' element={<Markets />} />
				<Route path='/markets/:code' element={<Transactions />} />

				<Route path='/likedMarkets' element={<Markets />} />
				<Route path='*' element={<_404 />} />
			</Routes>
		</div>
	)
}

export default App
