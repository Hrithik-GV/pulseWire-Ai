import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricsCard = ({ title, value, icon: Icon, trend, trendValue }) => {
  return (
    <div className="glass-card p-6 glass-card-hover group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold font-outfit text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
