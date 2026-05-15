import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ArrowUpRight,
  RefreshCw,
  Hash,
  MessageSquare,
  Globe
} from 'lucide-react';
import { publishingLogs } from '../data/mockData';
import { StatusBadge } from '../components/DashboardComponents';

const PublishingLogs = () => {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'telegram': return <Send className="w-4 h-4 text-blue-400" />;
      case 'discord': return <MessageSquare className="w-4 h-4 text-indigo-400" />;
      case 'reddit': return <Globe className="w-4 h-4 text-orange-400" />;
      default: return <History className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Publishing Activity</h1>
          <p className="text-muted-foreground mt-1">Full history of autonomous content distribution across all platforms.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors border border-border">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Export History
          </button>
        </div>
      </div>

      {/* Activity Feed Style Layout */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/10">
          <h3 className="font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Live Feed
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-green-500">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>1,242 Success</span>
            </div>
            <div className="flex items-center gap-1.5 text-red-500">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>12 Failures</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {publishingLogs.map((log, idx) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 flex flex-col md:flex-row gap-6 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex flex-row md:flex-col md:items-center gap-4 md:w-32 flex-shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  log.status === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 
                  log.status === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
                  'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                }`}>
                  {log.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : log.status === 'error' ? <AlertCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="md:text-center">
                  <div className="text-xs font-bold text-foreground">{log.timestamp}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Recorded</div>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-secondary rounded-lg border border-border">
                    {getPlatformIcon(log.platform)}
                    <span className="text-xs font-bold capitalize text-foreground">{log.platform}</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-secondary rounded-lg border border-border">
                    <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">{log.channel}</span>
                  </div>
                  <StatusBadge status={log.status} />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {log.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Action executed by <span className="text-primary font-medium">PubMaster Agent v2.1</span> via secure API gateway.
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col justify-end items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary rounded-lg transition-colors text-xs font-semibold text-muted-foreground hover:text-primary">
                  View Details
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 bg-secondary/10 flex items-center justify-center">
          <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
            <History className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Load older activity
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Distribution Mix</h4>
          <div className="space-y-4">
            {[
              { label: 'Telegram', value: 65, color: 'bg-blue-500' },
              { label: 'Discord', value: 25, color: 'bg-indigo-500' },
              { label: 'Reddit', value: 10, color: 'bg-orange-500' },
            ].map(item => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-4 rounded-2xl">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">99.1% Success Rate</h4>
              <p className="text-muted-foreground text-sm">Autonomous publishing pipeline is highly stable. Only 1 retry required in the last 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingLogs;
