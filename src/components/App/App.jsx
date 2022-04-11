import React from 'react';

import Routes from 'routes';

import Header from './Header';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
