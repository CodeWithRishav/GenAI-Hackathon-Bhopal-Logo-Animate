import React from 'react';
import { AnimatedLogo } from './components/AnimatedLogo';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-8 overflow-hidden relative">
      
      {/* Decorative background elements (subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-yellow-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[10%] left-[20%] w-[35%] h-[35%] bg-green-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="z-10 flex flex-col items-center gap-12">
        <div className="scale-75 sm:scale-100 md:scale-125 origin-center transition-transform duration-500">
           <AnimatedLogo />
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-12 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm font-medium transition-colors opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"
        >
          Replay Animation
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;