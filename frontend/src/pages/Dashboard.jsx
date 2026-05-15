import React, { useState } from 'react';
import { 
  Activity, 
  FileText, 
  Send, 
  Zap, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getWorkflows, getArticles, getPosts } from '../services/api';
import MetricsCard from '../components/MetricsCard';
import WorkflowCard from '../components/WorkflowCard';
import ArticleCard from '../components/ArticleCard';
import ArticlePreviewModal from '../components/ArticlePreviewModal';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const { data: workflows, loading: workflowsLoading } = useApi(getWorkflows, null, 10000);
  const { data: articles, loading: articlesLoading } = useApi(getArticles);
  const { data: posts, loading: postsLoading } = useApi(getPosts);

  if (workflowsLoading || articlesLoading || postsLoading) {
    return <LoadingSpinner lg message="Calibrating autonomous neural pipeline..." />;
  }

  const stats = [
    { title: 'Total Workflows', value: workflows?.length || 0, icon: Zap, trend: 'up', trendValue: '+12%' },
    { title: 'Articles Generated', value: articles?.length || 0, icon: FileText, trend: 'up', trendValue: '+5%' },
    { title: 'Posts Distributed', value: posts?.length || 0, icon: Send, trend: 'up', trendValue: '+18%' },
    { title: 'System Success Rate', value: '94.2%', icon: Activity, trend: 'down', trendValue: '-1.2%' },
  ];

  const activeWorkflows = workflows?.filter(w => w.status === 'running') || [];
  const completedWorkflows = workflows?.filter(w => w.status !== 'running').slice(0, 3) || [];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit">Neural Dashboard</h1>
          <p className="text-slate-400 mt-1">Autonomous journalism pipeline monitoring</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25">
          <Plus className="w-5 h-5" /> New Custom Workflow
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <MetricsCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Workflows */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" /> Live Pipelines
            </h2>
            <button className="text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
              View All Workflows
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeWorkflows.length > 0 ? (
              activeWorkflows.map(wf => (
                <WorkflowCard key={wf.id} workflow={wf} />
              ))
            ) : (
              <div className="col-span-2 glass-card p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-white font-bold mb-1">No active pipelines</h3>
                <p className="text-slate-500 text-sm">System is currently in idle monitoring mode</p>
              </div>
            )}
          </div>

          <div className="pt-6">
            <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-indigo-400" /> Recent Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles?.slice(0, 2).map(art => (
                <ArticleCard 
                  key={art.id} 
                  article={art} 
                  onClick={setSelectedArticle} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: History & Logs */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" /> Recent Completions
          </h2>
          <div className="space-y-4">
            {completedWorkflows.map(wf => (
              <div key={wf.id} className="glass-card p-4 flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${wf.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500'}`} />
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{wf.topic}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">
                      {new Date(wf.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            ))}
          </div>

          <div className="glass-card p-6 border-indigo-500/10 bg-gradient-to-br from-indigo-500/5 to-transparent">
            <h3 className="text-indigo-300 font-bold font-outfit mb-2">Automated Discovery</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              PulseWire AI is currently monitoring 14 global RSS feeds and 3 social platforms for emerging trends.
            </p>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Scanner Online</span>
            </div>
          </div>
        </div>
      </div>

      <ArticlePreviewModal 
        article={selectedArticle} 
        isOpen={!!selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
};

export default Dashboard;
