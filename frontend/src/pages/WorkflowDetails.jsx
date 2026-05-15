import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  GitBranch, 
  Clock, 
  Search, 
  ShieldCheck, 
  FileText, 
  Share2,
  Terminal,
  Activity,
  Cpu
} from 'lucide-react';
import { StatusBadge } from '../components/DashboardComponents';

const WorkflowDetails = () => {
  const { id } = useParams();

  const steps = [
    { 
      id: 1, 
      name: 'Event Detection', 
      agent: 'NewsScanner', 
      status: 'success', 
      time: '14:20:05', 
      logs: 'Detected high-velocity signals from @Reuters and @Bloomberg regarding AI policy.',
      icon: Search
    },
    { 
      id: 2, 
      name: 'Source Verification', 
      agent: 'SourceVerifier', 
      status: 'success', 
      time: '14:21:12', 
      logs: 'Verified 12/12 primary sources. Trust score: 0.992.',
      icon: ShieldCheck
    },
    { 
      id: 3, 
      name: 'Deep Research', 
      agent: 'DeepResearcher', 
      status: 'active', 
      time: '14:22:30', 
      logs: 'Analyzing 42-page draft regulation document. Identifying key impact areas...',
      icon: Cpu
    },
    { 
      id: 4, 
      name: 'Article Generation', 
      agent: 'ContentGenie', 
      status: 'pending', 
      time: 'Waiting', 
      logs: 'Queued - awaiting research completion.',
      icon: FileText
    },
    { 
      id: 5, 
      name: 'Multi-Platform Publishing', 
      agent: 'PubMaster', 
      status: 'pending', 
      time: 'Waiting', 
      logs: 'Queued for Telegram, Discord, and Reddit.',
      icon: Share2
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-2xl">
              <GitBranch className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Global Tech Breakdown</h1>
                <StatusBadge status="active" />
              </div>
              <p className="text-muted-foreground text-sm mt-1">Workflow ID: <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">{id}</code> • Initiated 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary rounded-xl transition-colors border border-border">
              <Activity className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-all">
              Pause Execution
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Execution Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/20">
              <h3 className="font-bold">Execution Flow</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Clock className="w-3.5 h-3.5" />
                Real-time tracking enabled
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-0">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 relative"
                  >
                    {/* Connector line */}
                    {idx !== steps.length - 1 && (
                      <div className={`absolute left-6 top-10 w-[2px] h-[calc(100%-20px)] ${step.status === 'success' ? 'bg-primary' : 'bg-border'}`} />
                    )}
                    
                    <div className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all shadow-lg ${
                      step.status === 'success' ? 'bg-primary/10 border-primary text-primary' : 
                      step.status === 'active' ? 'bg-background border-primary text-primary animate-pulse shadow-primary/20' : 
                      'bg-secondary border-border text-muted-foreground'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 pb-10">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-bold text-lg ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {step.name}
                        </h4>
                        <span className="text-xs font-mono text-muted-foreground">{step.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">{step.agent}</span>
                        <span className="text-muted-foreground">•</span>
                        <StatusBadge status={step.status} />
                      </div>
                      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50 text-sm text-muted-foreground leading-relaxed italic">
                        "{step.logs}"
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trace & Info Sidebar */}
        <div className="space-y-6">
          <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-5 h-5 text-primary" />
              <h3 className="font-bold">System Trace</h3>
            </div>
            <div className="space-y-3 font-mono text-[11px] leading-tight">
              <div className="p-3 bg-black/90 text-green-400 rounded-lg border border-white/10 overflow-hidden">
                <div className="mb-1 opacity-50">[14:20:05] SCAN_INIT ...</div>
                <div className="mb-1 text-blue-400">FINDING BREAKING NEWS: AI POLICY</div>
                <div className="mb-1 text-yellow-400">VERIFYING SOURCES: 12 FOUND</div>
                <div className="mb-1 text-white animate-pulse">&gt; ANALYZING DOCUMENT_REF_42...</div>
                <div className="mt-4 opacity-50 italic">Listening for new events...</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Omium trace visualization for debugging agent reasoning steps.</p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h3 className="font-bold">Workflow Config</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Confidence Threshold</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Auto-Publishing</span>
                <span className="text-green-500 font-medium">Enabled</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Research Depth</span>
                <span className="font-medium">Level 3</span>
              </div>
            </div>
            <button className="w-full py-2 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors mt-2">
              Edit Parameters
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetails;
