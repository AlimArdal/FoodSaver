import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inventory from './pages/Inventory';
import Recipes from './pages/Recipes';
import ShoppingList from './pages/ShoppingList';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inventory />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="shopping-list" element={<ShoppingList />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}

export default App;