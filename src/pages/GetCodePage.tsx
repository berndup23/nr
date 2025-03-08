import React, { useState } from 'react';
import { ArrowLeft, Key } from 'lucide-react';
import { getAuthCode } from '../services/api';

interface GetCodePageProps {
  onBackToHome: () => void;
}

function GetCodePage({ onBackToHome }: GetCodePageProps) {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateCode = async () => {
    setLoading(true);
    const code = await getAuthCode();
    
    // 4 digit
    if (code) {
      const formattedCode = code
        .split('')
        .reduce((acc, char, index) => {
          if (index > 0 && index % 4 === 0) {
            return acc + ' ' + char;
          }
          return acc + char;
        }, '');
      setAuthCode(formattedCode);
    } else {
      setAuthCode(null);
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
        <h2 className="text-3xl font-bold mb-6">Generate Your Access Code</h2>
        
        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            You can generate your unique and permanent code below that will be used to access your account.
          </p>
          
          <p className="leading-relaxed font-medium text-red-400">
            IMPORTANT: Do not share this code with anyone as they will be able to access your account. Once generated, you can use this code to log in to your dashboard.
          </p>
          
          <div className="mt-8 flex flex-col items-center">
            <button 
              onClick={handleGenerateCode}
              className="px-8 py-4 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
              disabled={loading}
            >
              <Key size={20} />
              <span>{loading ? 'Generating...' : 'Generate Access Code'}</span>
            </button>

            {authCode && (
              <p className="mt-4 text-lg font-mono bg-gray-800 px-4 py-2 rounded-lg text-white">
                {authCode}
              </p>
            )}

            <p className="mt-4 text-sm text-gray-400">
              Once generated, your code will be permanent and linked to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetCodePage;