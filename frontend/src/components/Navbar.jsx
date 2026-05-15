import React from 'react';
import { Activity, Radio } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass-card rounded-none border-t-0 border-x-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold font-outfit tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          PulseWire AI
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Live System Active</span>
        </div>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Radio className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
