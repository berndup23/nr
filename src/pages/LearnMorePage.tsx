import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

interface LearnMorePageProps {
  onBackToHome: () => void;
}

function LearnMorePage({ onBackToHome }: LearnMorePageProps) {
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
        <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
        
        <div className="flex items-start gap-4 p-4 bg-red-900/20 border border-red-800/50 rounded-lg mb-8">
          <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-red-400 mb-2">Important Notice</h3>
            <p className="text-gray-300">
              Please read our terms of service carefully. Violation of these terms will result in immediate termination of your services.
            </p>
          </div>
        </div>
        
        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Work on the Russian Federation and the CIS (Armenia, Azerbaijan, Belarus, Kazakhstan, Kyrgyzstan, Moldova, Russia, Tajikistan, Uzbekistan) is strictly prohibited, any complaints received about such actions mean an immediate blocking of your services!
          </p>
          
          <p className="leading-relaxed">
            Child Porn, weapons, drugs and terrorism are also strictly prohibited!
          </p>
          
          <p className="leading-relaxed">
            Except that, do whatever you want.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LearnMorePage;