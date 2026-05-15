import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Terminal, GitBranch, Share2, Info } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getWorkflowById } from '../services/api';
import AgentTimeline from '../components/AgentTimeline';
import LogEntry from '../components/LogEntry';
import LoadingSpinner from '../components/LoadingSpinner';

const WorkflowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: workflow, loading } = useApi(getWorkflowById, id, 5000);

  if (loading) return <LoadingSpinner lg message="Fetching workflow trace data..." />;
  if (!workflow) return <div className="p-12 text-center text-slate-500">Workflow not found</div>;

  const logs = [
    { timestamp: new Date(workflow.created_at), level: 'INFO', agent: 'SYSTEM', message: 'Workflow initialized via RSS Trigger' },
    { timestamp: new Date(new Date(workflow.created_at).getTime() + 2000), level: 'INFO', agent: 'PLANNER', message: 'Execution plan created for topic: ' + workflow.topic },
    { timestamp: new Date(new Date(workflow.created_at).getTime() + 5000), level: 'DEBUG', agent: 'RESEARCH', message: 'Fetching sources from Google News RSS...' },
    { timestamp: new Date(new Date(workflow.created_at).getTime() + 15000), level: 'INFO', agent: 'RESEARCH', message: 'Collected 14 relevant articles' },
    { timestamp: new Date(new Date(workflow.created_at).getTime() + 18000), level: 'WARN', agent: 'FACTCHECK', message: 'Low confidence source detected: blogspot.com. Skipping.' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-slate-700 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-bold font-outfit uppercase tracking-widest text-xs">Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trace ID</span>
            <span className="text-sm font-mono text-indigo-400 font-bold">{workflow.id}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white font-outfit leading-tight mb-2">
                  {workflow.topic}
                </h1>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4 text-indigo-500" />
                    <span>Neural Trace</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-indigo-500" />
                    <span>3 Target Platforms</span>
                  </div>
                </div>
              </div>
              <div className={`status-badge px-4 py-1.5 text-sm ${
                workflow.status === 'completed' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                workflow.status === 'failed' ? 'text-rose-400 border-rose-400/20 bg-rose-400/5' :
                'text-amber-400 border-amber-400/20 bg-amber-400/5'
              }`}>
                {workflow.status.toUpperCase()}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 flex items-start gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                <Info className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Execution Insight</h4>
                <p className="text-sm text-slate-400 leading-relaxed mt-1">
                  {workflow.status === 'running' 
                    ? `The pipeline is currently at the ${workflow.current_agent} phase. Estimated completion in 45 seconds.`
                    : workflow.status === 'completed'
                    ? 'All agents completed their assigned tasks. Article and social posts have been generated.'
                    : `Pipeline halted at ${workflow.current_agent}. Reason: ${workflow.error || 'Unknown error'}`}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" /> Execution Logs
            </h2>
            <div className="glass-card overflow-hidden">
              <div className="bg-slate-950 p-4 max-h-[400px] overflow-y-auto space-y-1 scrollbar-thin">
                {logs.map((log, i) => (
                  <LogEntry key={i} {...log} />
                ))}
                {workflow.status === 'running' && (
                  <div className="flex gap-4 font-mono text-xs py-1.5 px-2">
                    <span className="text-indigo-400 animate-pulse">▋ Waiting for agent output...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" /> Agent Hierarchy
          </h2>
          <AgentTimeline steps={workflow.steps} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetails;
