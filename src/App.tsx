import React, { useState, useEffect } from 'react';
import { Shield, Zap, Server, Home, LogIn, Code, LogOut, CreditCard, Settings, Layout, Menu, X, Wallet } from 'lucide-react';
import HomePage from './pages/HomePage';
import LearnMorePage from './pages/LearnMorePage';
import GetCodePage from './pages/GetCodePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const adminToken = localStorage.getItem('adminToken');
    const path = window.location.pathname;

    if (adminToken && path.startsWith('/admin')) {
      setCurrentPage('admin-dashboard');
    } else if (path === '/admin/login') {
      setCurrentPage('admin-login');
    } else if (token) {
      setIsLoggedIn(true);
      if (currentPage === 'login' || currentPage === 'get-code') {
        setCurrentPage('dashboard');
      }
    } else {
      if (currentPage === 'dashboard' || currentPage === 'pricing' || currentPage === 'settings') {
        setCurrentPage('home');
      }
    }
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setCurrentPage('home');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleDeposit = () => {
    window.location.href = '/dashboard';
  };

  // Si on est sur une page admin, on affiche le composant correspondant
  if (currentPage === 'admin-login') {
    return <AdminLoginPage />;
  }

  if (currentPage === 'admin-dashboard') {
    return <AdminDashboardPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl bottom-[-200px] right-[-200px]"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-white/3 blur-2xl top-[10%] left-[-100px]"></div>
      
      {/* Navbar */}
      <nav className="w-full bg-gray-900 border-b border-gray-800 py-4 px-8 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold tracking-wider text-white">NETRUNNER</h1>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-gray-300 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          <button 
            onClick={() => handleNavigation('home')}
            data-page="home"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentPage === 'home' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => handleNavigation('dashboard')}
                data-page="dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentPage === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
              >
                <Layout size={18} />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => handleNavigation('pricing')}
                data-page="pricing"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentPage === 'pricing' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
              >
                <CreditCard size={18} />
                <span>Pricing</span>
              </button>
              <button 
                onClick={() => handleNavigation('settings')}
                data-page="settings"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentPage === 'settings' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <div className="h-6 w-px bg-gray-800 mx-2"></div>
              <button 
                onClick={handleDeposit}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <Wallet size={18} className="text-gray-400" />
                <span>Deposit</span>
                <span className="text-sm text-gray-400">$0</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:bg-gray-800/50"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleNavigation('get-code')}
                data-page="get-code"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentPage === 'get-code' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
              >
                <Code size={18} />
                <span>Get Code</span>
              </button>
              <button 
                onClick={() => handleNavigation('login')}
                data-page="login"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentPage === 'login' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-gray-900 z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-8 pt-24 space-y-4">
          <button 
            onClick={() => handleNavigation('home')}
            data-page="home"
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              currentPage === 'home' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
            }`}
          >
            <Home size={20} />
            <span className="text-lg">Home</span>
          </button>
          
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => handleNavigation('dashboard')}
                data-page="dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  currentPage === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                }`}
              >
                <Layout size={20} />
                <span className="text-lg">Dashboard</span>
              </button>
              <button 
                onClick={() => handleNavigation('pricing')}
                data-page="pricing"
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  currentPage === 'pricing' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                }`}
              >
                <CreditCard size={20} />
                <span className="text-lg">Pricing</span>
              </button>
              <button 
                onClick={() => handleNavigation('settings')}
                data-page="settings"
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  currentPage === 'settings' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                }`}
              >
                <Settings size={20} />
                <span className="text-lg">Settings</span>
              </button>
              <button 
                onClick={handleDeposit}
                className="flex items-center gap-3 px-4 py-3 rounded-md bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <Wallet size={20} className="text-gray-400" />
                <span className="text-lg">Deposit</span>
                <span className="text-sm text-gray-400">$0</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-800/50"
              >
                <LogOut size={20} />
                <span className="text-lg">Logout</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleNavigation('get-code')}
                data-page="get-code"
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  currentPage === 'get-code' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                }`}
              >
                <Code size={20} />
                <span className="text-lg">Get Code</span>
              </button>
              <button 
                onClick={() => handleNavigation('login')}
                data-page="login"
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  currentPage === 'login' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                }`}
              >
                <LogIn size={20} />
                <span className="text-lg">Login</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-16">
        {currentPage === 'home' ? (
          <HomePage onLearnMore={() => handleNavigation('learn-more')} />
        ) : currentPage === 'learn-more' ? (
          <LearnMorePage onBackToHome={() => handleNavigation('home')} />
        ) : currentPage === 'get-code' ? (
          <GetCodePage onBackToHome={() => handleNavigation('home')} />
        ) : currentPage === 'login' ? (
          <LoginPage onBackToHome={() => handleNavigation('home')} />
        ) : isLoggedIn && currentPage === 'dashboard' ? (
          <DashboardPage />
        ) : isLoggedIn && currentPage === 'pricing' ? (
          <PricingPage />
        ) : isLoggedIn && currentPage === 'settings' ? (
          <SettingsPage />
        ) : (
          <HomePage onLearnMore={() => handleNavigation('learn-more')} />
        )}
      </div>
    </div>
  );
}

export default App;