import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  FileText, 
  Globe, 
  Share2,
  TrendingUp,
  Activity,
  Plus
} from 'lucide-react';
import { MetricsCard, WorkflowCard, AgentStatusCard, StatusBadge } from '../components/DashboardComponents';
import { workflows, agents, articles, publishingLogs } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground mt-1">Autonomous news intelligence & multi-platform publishing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors">
            System Config
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            New Workflow
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard 
          title="Breaking Detection" 
          value="1,284" 
          icon={Zap} 
          trend={12} 
          description="Signals analyzed in last 24h"
        />
        <MetricsCard 
          title="Verified Sources" 
          value="452" 
          icon={Globe} 
          trend={8} 
          description="Active verified outlets"
        />
        <MetricsCard 
          title="Generated Content" 
          value="86" 
          icon={FileText} 
          trend={24} 
          description="Articles & social posts"
        />
        <MetricsCard 
          title="Network Reach" 
          value="2.4M" 
          icon={Share2} 
          trend={15} 
          description="Aggregated impressions"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Workflows Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Active Workflows</h2>
            </div>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((wf) => (
              <motion.div
                key={wf.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <WorkflowCard workflow={wf} />
              </motion.div>
            ))}
          </div>

          {/* Recent Articles */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Recent Intelligence</h2>
              </div>
              <button className="text-sm text-primary font-medium hover:underline">Full Library</button>
            </div>
            
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {articles.map((article, idx) => (
                <div 
                  key={article.id} 
                  className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-secondary/20 transition-colors ${idx !== articles.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg leading-tight mb-1">{article.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        {article.platforms.map(p => (
                          <span key={p} className="capitalize px-1.5 py-0.5 bg-secondary rounded text-[10px]">{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold">{article.reach}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">Est. Reach</div>
                    </div>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary">
                      <TrendingUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Status Panels */}
        <div className="space-y-8">
          {/* Agent Fleet */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Agent Fleet</h2>
              <StatusBadge status="active" />
            </div>
            <div className="space-y-3">
              {agents.map((agent) => (
                <AgentStatusCard key={agent.id} agent={agent} />
              ))}
            </div>
          </section>

          {/* Publishing Activity */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">Live Activity</h2>
            <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
              {publishingLogs.map((log, idx) => (
                <div key={log.id} className="flex gap-3 relative">
                  {idx !== publishingLogs.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-[2px] h-6 bg-border" />
                  )}
                  <div className={`mt-1.5 w-[6px] h-[6px] rounded-full flex-shrink-0 ${log.status === 'success' ? 'bg-green-500' : log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-foreground capitalize">{log.platform}</span>
                      <span className="text-[10px] text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{log.message}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mt-2">
                View Full History
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
