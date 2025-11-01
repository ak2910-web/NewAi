import React from 'react';
import { AtSymbolIcon } from './icons/AtSymbolIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { GoogleIcon } from './icons/GoogleIcon';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 to-[#FAF8F0]">
        <div className="w-full max-w-sm">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-amber-900">VedAI</h1>
                <p className="text-amber-800/70 mt-1">Ancient Wisdom Through AI</p>
            </header>

            <main className="space-y-4">
                <div className="relative">
                    <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" />
                    <a href="#" className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-amber-600 hover:underline">Forgot?</a>
                </div>

                <button 
                    onClick={onLogin} 
                    className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 transition-colors"
                >
                    Login
                </button>
            </main>

            <footer className="mt-6 text-center">
                <p className="text-sm text-zinc-600">
                    Don't have an account? <a href="#" className="font-semibold text-amber-600 hover:underline">Sign Up</a>
                </p>
                 <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-zinc-300"></div>
                    <span className="flex-shrink mx-4 text-zinc-400 text-xs">OR</span>
                    <div className="flex-grow border-t border-zinc-300"></div>
                </div>
                <button 
                    onClick={onLogin}
                    className="w-full flex items-center justify-center py-3 bg-white border border-zinc-300 rounded-lg shadow-sm hover:bg-zinc-50 transition-colors"
                >
                    <GoogleIcon className="w-5 h-5 mr-3" />
                    <span className="text-sm font-semibold text-zinc-700">Continue with Google</span>
                </button>
            </footer>
        </div>
    </div>
  );
};