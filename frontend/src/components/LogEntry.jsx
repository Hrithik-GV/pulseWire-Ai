import React from 'react';

const LogEntry = ({ timestamp, level, agent, message }) => {
  const levels = {
    INFO: 'text-emerald-400',
    WARN: 'text-amber-400',
    ERROR: 'text-rose-400',
    DEBUG: 'text-indigo-400',
  };

  return (
    <div className="flex gap-4 font-mono text-xs py-1.5 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors px-2 rounded">
      <span className="text-slate-600 shrink-0">[{new Date(timestamp).toLocaleTimeString()}]</span>
      <span className={`font-bold shrink-0 w-12 ${levels[level] || 'text-slate-400'}`}>{level}</span>
      <span className="text-indigo-300 shrink-0 font-bold">[{agent}]</span>
      <span className="text-slate-300 break-all">{message}</span>
    </div>
  );
};

export default LogEntry;
