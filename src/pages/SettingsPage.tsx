import React, { useEffect, useState } from 'react';
import { Shield, User, Key } from 'lucide-react';
import { getMyCode } from '../services/api';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      const code = await getMyCode();
      setAccessCode(code);
      setLoading(false);
    };

    fetchCode();
  }, []);

  return (
    <div className="max-w-6xl w-full relative z-10 py-8">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden">
        <div className="border-b border-gray-800">
          <div className="flex">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'account'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>Account</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'security'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <span>Security</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 mb-1">Access Code</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-mono bg-gray-800 px-3 py-1 rounded">
                        {loading ? 'Loading...' : accessCode || 'No code available'}
                      </p>
                      <button 
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={() => navigator.clipboard.writeText(accessCode || '')}
                        disabled={!accessCode}
                      >
                        <Key size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">This is your unique access code. Keep it secure.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Access Code</h3>
                
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Your access code is the only way to log in to your account. Keep it secure and do not share it with anyone.
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-mono bg-gray-800 px-3 py-1 rounded">
                      {loading ? 'Loading...' : accessCode || 'No code available'}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <button 
                      className="px-4 py-2 bg-gray-700 text-gray-400 font-medium rounded-md cursor-not-allowed"
                      disabled
                    >
                      Generate New Access Code
                    </button>
                    <p className="text-sm text-red-400 mt-2">
                      Warning: Generating a new access code will invalidate your current code.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
