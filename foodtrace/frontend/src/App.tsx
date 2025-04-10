import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Business from './pages/Business';
import Products from './pages/Products';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/business" element={<Layout><Business /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/tracking" element={<Layout><Tracking /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;