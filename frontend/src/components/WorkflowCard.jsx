import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const WorkflowCard = ({ workflow }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-amber-400 border-amber-400/20 bg-amber-400/5';
      case 'completed': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5';
      case 'failed': return 'text-rose-400 border-rose-400/20 bg-rose-400/5';
      default: return 'text-slate-400 border-slate-400/20 bg-slate-400/5';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div 
      onClick={() => navigate(`/workflow/${workflow.id}`)}
      className="glass-card p-5 glass-card-hover cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`status-badge flex items-center gap-1.5 ${getStatusColor(workflow.status)}`}>
            {getStatusIcon(workflow.status)}
            {workflow.status.toUpperCase()}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
            {workflow.topic}
          </h3>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
      </div>

      <div className="space-y-4">
        <div className="w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              workflow.status === 'failed' ? 'bg-rose-500' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
            }`}
            style={{ width: `${workflow.progress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {new Date(workflow.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="font-medium">
            {workflow.status === 'running' ? `Agent: ${workflow.current_agent}` : workflow.current_agent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
