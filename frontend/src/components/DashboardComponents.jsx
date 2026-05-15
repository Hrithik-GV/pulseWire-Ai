import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  ArrowUpRight,
  Database,
  ShieldCheck,
  FileEdit
} from 'lucide-react';

export const MetricsCard = ({ title, value, icon: Icon, trend, description }) => (
  <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-secondary rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  </div>
);

export const WorkflowCard = ({ workflow }) => {
  const isCompleted = workflow.status === 'completed';
  const isActive = workflow.status === 'active' || workflow.status === 'processing';

  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isCompleted ? 'bg-green-500/10' : 'bg-primary/10'}`}>
            <GitBranch className={`w-5 h-5 ${isCompleted ? 'text-green-500' : 'text-primary'}`} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{workflow.name}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="capitalize">{workflow.type}</span>
              <span>•</span>
              <span>{workflow.timestamp}</span>
            </div>
          </div>
        </div>
        <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
          <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Active Agent: <span className="text-foreground font-medium">{workflow.agent}</span></span>
          <span className="font-medium text-primary">{workflow.progress}%</span>
        </div>
        
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${workflow.progress}%` }}
            className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}
          />
        </div>

        <div className="flex items-center gap-2 bg-secondary/30 p-2.5 rounded-xl border border-border/50">
          {isActive ? <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
          <span className="text-xs text-muted-foreground truncate">{workflow.lastStep}</span>
        </div>
      </div>
    </div>
  );
};

export const AgentStatusCard = ({ agent }) => {
  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-primary',
    idle: 'bg-yellow-500',
    offline: 'bg-muted-foreground'
  };

  return (
    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl border border-border/50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center">
            <Database className="w-5 h-5 text-primary/70" />
          </div>
          <span className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-background rounded-full ${statusColors[agent.status]}`}></span>
        </div>
        <div>
          <div className="text-sm font-semibold">{agent.name}</div>
          <div className="text-[10px] uppercase tracking-wider font-bold opacity-50">{agent.role}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs font-medium mb-1">Load: {agent.load}%</div>
        <div className="h-1 w-16 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${agent.load}%` }} />
        </div>
      </div>
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const styles = {
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    active: 'bg-primary/10 text-primary border-primary/20',
  };

  return (
    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${styles[status] || styles.active}`}>
      {status}
    </span>
  );
};
