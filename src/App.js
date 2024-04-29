import React from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Product from './pages/Product';
import MainLayout from './layouts/MainLayout';
import CheckOut from './components/CheckOut';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="shoes/:id" element={<Product />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
