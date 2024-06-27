import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoffeeApp from './components/CoffeeApp';
import ShopDetail from './components/ShopDetail';
import MapView from './components/MapView';
import GiftCard from './components/GiftCard';
import Success from './components/Success';
import Cancel from './components/Cancel';

const App = () => {
  return (
    <Router>
      <div className='bg-slate-300'>
        <Routes>
          <Route path="/" element={<CoffeeApp />} />
          <Route path="/shops/:id" element={<ShopDetail />} />
          <Route path="/shops/:id/map" element={<MapView />} />
          <Route path="/gift-card" element={<GiftCard />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
