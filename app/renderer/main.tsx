import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './routes/AppLayout';
import Home from './routes/Home';
import Closet from './routes/Closet';
import OutfitStudio from './routes/OutfitStudio';
import Outfits from './routes/Outfits';
import Analysis from './routes/Analysis';
import Analytics from './routes/Analytics';
import Community from './routes/Community';
import Wishlist from './routes/Wishlist';
import Profile from './routes/Profile';
import Settings from './routes/Settings';
import './styles/global.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root container missing');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="closet" element={<Closet />} />
          <Route path="studio" element={<OutfitStudio />} />
          <Route path="outfits" element={<Outfits />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="community" element={<Community />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
