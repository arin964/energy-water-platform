import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EnergyPage from './pages/EnergyPage';
import WaterPage from './pages/WaterPage';
import ForecastPage from './pages/ForecastPage';
import OptimizationPage from './pages/OptimizationPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import SystemSettingsPage from './pages/SystemSettingsPage'; // Yeni Sayfa
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';
import DataImportPage from './pages/DataImportPage';
import NotificationsPage from './pages/NotificationsPage';
import { SettingsProvider } from './pages/SettingsPage.tsx';
import './styles/globals.css';
import LandingPage from './pages/LandingPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user');
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/energy" element={<ProtectedRoute><EnergyPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/water" element={<ProtectedRoute><WaterPage /></ProtectedRoute>} />
          <Route path="/forecast" element={<ProtectedRoute><ForecastPage /></ProtectedRoute>} />
          <Route path="/optimization" element={<ProtectedRoute><OptimizationPage /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          
          {/* Sidebar'dan gidilen Kullanıcı Ayarları */}
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          
          {/* Admin menüsünden gidilen Teknik Sistem Ayarları */}
          <Route path="/system-settings" element={<ProtectedRoute><SystemSettingsPage /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/data-import" element={<ProtectedRoute><DataImportPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
};

export default App;