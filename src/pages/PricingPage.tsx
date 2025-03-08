import React from 'react';
import { Server, Database, Clock, Check } from 'lucide-react';

function PricingPage() {
  const handleOrder = () => {
    // Redirect to dashboard or handle order process
    window.location.href = '/dashboard';
  };

  return (
    <div className="max-w-6xl w-full relative z-10 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hosting Plans</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Choose the perfect offshore hosting plan for your needs
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
              className="w-full px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
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
              className="w-full px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
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
              className="w-full px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Order
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 p-8">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
        <p className="text-gray-300 mb-6">
          Contact us via Telegram for custom hosting solutions tailored to your specific requirements.
        </p>
        <a 
          href="https://t.me/netrunnerhost" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors inline-block"
        >
          Contact via Telegram
        </a>
      </div>
    </div>
  );
}

export default PricingPage;