import React from 'react';

export default function DoctorBotModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-indigo-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Glassmorphic Card */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        
        {/* Animated Glow in Background */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Floating Robot Icon */}
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg mb-6 animate-bounce">
            🤖
          </div>
          
          <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
            Doctor Bot Advice
          </h2>
          
          <p className="text-gray-800 font-medium leading-relaxed mb-8 italic">
            "{message}"
          </p>

          <button 
            onClick={onClose}
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black hover:scale-105 transition-all shadow-xl"
          >
            Got it, Doc!
          </button>
        </div>
      </div>
    </div>
  );
}