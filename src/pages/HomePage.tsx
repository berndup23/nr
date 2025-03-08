import React from 'react';
import { Shield, Zap, Server, Database, Clock, Check, MessageCircle } from 'lucide-react';

interface HomePageProps {
  onLearnMore: () => void;
}

function HomePage({ onLearnMore }: HomePageProps) {
  const handleOrder = () => {
    const navLoginButton = document.querySelector('[data-page="login"]');
    if (navLoginButton) {
      (navLoginButton as HTMLButtonElement).click();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative z-10 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-20">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          <span className="text-white">One-click Bulletproof</span>
          <br />
          <span className="text-gray-500">Hosting</span>
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Unlock unmatched security and performance with our bulletproof hosting – your website,
          safeguarded and always online.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a 
            href="https://t.me/netrunnerhost" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Telegram
          </a>
          <button 
            onClick={onLearnMore}
            className="px-8 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
          >
            Learn More
          </button>
        </div>

        {/* Support Link */}
        <div className="flex justify-center mt-4">
          <a 
            href="https://t.me/netrunnersupport" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <MessageCircle size={18} />
            <span>Need help? Contact Support</span>
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center border border-gray-800">
            <Server className="w-8 h-8 mb-4" />
            <span className="text-lg font-medium">99.9% Uptime</span>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center border border-gray-800">
            <Zap className="w-8 h-8 mb-4" />
            <span className="text-lg font-medium">Instant Setup</span>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center border border-gray-800">
            <Shield className="w-8 h-8 mb-4" />
            <span className="text-lg font-medium">BulletProof Protection</span>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Hosting Plans</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect bulletproof hosting plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PLESK 1 */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold mb-2">PLESK 1</h2>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold">$10</span>
                <span className="text-gray-400 mb-1">/ 30 days</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-800/50">
                <Check size={14} className="mr-1" />
                Available
              </div>
            </div>
            
            <div className="p-6 flex-1">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Server size={20} className="text-gray-400" />
                  <span>3x Domain Slots</span>
                </li>
                <li className="flex items-center gap-3">
                  <Database size={20} className="text-gray-400" />
                  <span>No Database</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                    <path d="M6 12h12" />
                    <path d="M8 16V8" />
                  </svg>
                  <span>NodeJS Enabled</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-400" />
                  <span>30 Days Duration</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-800">
              <button 
                onClick={handleOrder}
                className="block w-full px-6 py-3 bg-white text-black text-center font-medium rounded-md hover:bg-gray-200 transition-colors"
              >
                Order
              </button>
            </div>
          </div>
          
          {/* PLESK 2 */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 right-0 bg-white text-black px-4 py-1 text-sm font-medium">
              Popular
            </div>
            
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold mb-2">PLESK 2</h2>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold">$15</span>
                <span className="text-gray-400 mb-1">/ 30 days</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-800/50">
                <Check size={14} className="mr-1" />
                Available
              </div>
            </div>
            
            <div className="p-6 flex-1">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Server size={20} className="text-gray-400" />
                  <span>4x Domain Slots</span>
                </li>
                <li className="flex items-center gap-3">
                  <Database size={20} className="text-gray-400" />
                  <span>4x Databases</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                    <path d="M6 12h12" />
                    <path d="M8 16V8" />
                  </svg>
                  <span>NodeJS Enabled</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-400" />
                  <span>30 Days Duration</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-800">
              <button 
                onClick={handleOrder}
                className="block w-full px-6 py-3 bg-white text-black text-center font-medium rounded-md hover:bg-gray-200 transition-colors"
              >
                Order
              </button>
            </div>
          </div>
          
          {/* PLESK 3 */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold mb-2">PLESK 3</h2>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold">$25</span>
                <span className="text-gray-400 mb-1">/ 30 days</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-800/50">
                <Check size={14} className="mr-1" />
                Available
              </div>
            </div>
            
            <div className="p-6 flex-1">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Server size={20} className="text-gray-400" />
                  <span>7x Domain Slots</span>
                </li>
                <li className="flex items-center gap-3">
                  <Database size={20} className="text-gray-400" />
                  <span>7x Databases</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                    <path d="M6 12h12" />
                    <path d="M8 16V8" />
                  </svg>
                  <span>NodeJS Enabled</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-400" />
                  <span>30 Days Duration</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-800">
              <button 
                onClick={handleOrder}
                className="block w-full px-6 py-3 bg-white text-black text-center font-medium rounded-md hover:bg-gray-200 transition-colors"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto Footer */}
      <div className="mt-20 pt-12 border-t border-gray-800">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">Crypto Accepted</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg" alt="Bitcoin" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" alt="Ethereum" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
            <img src="https://cryptologos.cc/logos/monero-xmr-logo.svg" alt="Monero" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
            <img src="https://cryptologos.cc/logos/solana-sol-logo.svg" alt="Solana" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
            <img src="https://cryptologos.cc/logos/litecoin-ltc-logo.svg" alt="Litecoin" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;