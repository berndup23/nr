import React, { useState } from 'react';
import { ArrowLeft, LogIn } from 'lucide-react';
import { loginWithCode } from '../services/api';

interface LoginPageProps {
  onBackToHome: () => void;
}

function LoginPage({ onBackToHome }: LoginPageProps) {
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 4 chiffre puis espace regex
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    // formate avc un espace
    const formattedValue = value
      .split('')
      .reduce((acc, char, index) => {
        if (index > 0 && index % 4 === 0) {
          return acc + ' ' + char;
        }
        return acc + char;
      }, '');
    
    setAccessCode(formattedValue);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // tej les espace avant de send au back
    const cleanCode = accessCode.replace(/\s/g, '');
    
    const token = await loginWithCode(cleanCode);

    if (token) {
      localStorage.setItem('authToken', token); // save le token local storage
      window.location.href = '/dashboard'; // redirect dashboard
    } else {
      setError('Invalid access code. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl w-full relative z-10 py-12">
      <button 
        onClick={onBackToHome}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>
      
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
        <h2 className="text-3xl font-bold mb-6">Access Your Dashboard</h2>
        
        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Enter your access code below to log in to your dashboard.
          </p>
          
          <form onSubmit={handleLogin} className="mt-8">
            <div className="flex flex-col space-y-4">
              <label htmlFor="accessCode" className="text-sm font-medium text-gray-400">
                Your Access Code
              </label>
              <input
                id="accessCode"
                type="text"
                value={accessCode}
                onChange={handleCodeChange}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 font-mono"
                placeholder="Enter your access code"
                required
              />
              
              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={loading || !accessCode}
                  className={`px-8 py-4 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 ${
                    (loading || !accessCode) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      <span>Access Dashboard</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an access code yet? <button onClick={() => window.location.href = '#get-code'} className="text-white hover:underline">Generate one here</button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;