import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import _404 from './components/_404'
import Home from './components/Home'
import Markets from './components/Markets'

function App() {
	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/markets' element={<Markets />} />
				<Route path='*' element={<_404 />} />
			</Routes>
		</div>
	)
}

export default App
