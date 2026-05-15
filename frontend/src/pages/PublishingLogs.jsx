import React from 'react';
import { Terminal, Search, Filter, ExternalLink } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getPosts } from '../services/api';
import PublishingStatusBadge from '../components/PublishingStatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const PublishingLogs = () => {
  const { data: posts, loading } = useApi(getPosts);

  if (loading) return <LoadingSpinner lg message="Retrieving distribution logs..." />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit">Distribution Hub</h1>
          <p className="text-slate-400 mt-1">Multi-platform publishing logs and status</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter logs..."
              className="pl-11 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-white font-bold text-sm transition-all">
            <Filter className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Platform</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Post Content Preview</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {posts?.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-6 whitespace-nowrap text-xs font-mono text-slate-500">
                    {new Date().toLocaleString()}
                  </td>
                  <td className="px-6 py-6">
                    <PublishingStatusBadge platform={post.platform} status={post.status} />
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm text-slate-300 max-w-md line-clamp-1 group-hover:line-clamp-none transition-all">
                      {post.content}
                    </p>
                  </td>
                  <td className="px-6 py-6">
                    {post.error ? (
                      <span className="text-[10px] text-rose-400 font-bold bg-rose-500/5 border border-rose-500/20 px-2 py-1 rounded">
                        {post.error}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">OK</span>
                    )}
                  </td>
                  <td className="px-6 py-6 text-right">
                    {post.url ? (
                      <a 
                        href={post.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        View Post <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors">
                        Retry Send
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-6 flex items-center gap-6 bg-indigo-500/5 border-indigo-500/10">
        <div className="p-4 bg-indigo-500/10 rounded-2xl">
          <Terminal className="w-8 h-8 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-outfit">Real-time Webhooks</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Distribution is handled via async background tasks. Successfully published posts are instantly traceable via Omium SDK integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishingLogs;
