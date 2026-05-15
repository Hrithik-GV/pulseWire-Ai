import React from 'react';
import { X, ExternalLink, Hash, MessageSquare, Send, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ArticlePreviewModal = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-full overflow-hidden glass-card rounded-3xl flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <Hash className="text-indigo-400 w-5 h-5" />
              </div>
              <div>
                <h2 className="text-white font-bold font-outfit">Article Preview</h2>
                <p className="text-xs text-slate-500">Workflow ID: {article.workflow_id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {article.sources?.map((source, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700 uppercase tracking-tighter">
                    {source}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight font-outfit">
                {article.title}
              </h1>
              <p className="text-lg text-indigo-300 font-medium italic leading-relaxed">
                {article.summary}
              </p>
            </header>

            <article className="prose prose-invert max-w-none prose-p:text-slate-400 prose-p:leading-loose prose-p:text-lg">
              {article.content}
            </article>

            {/* Social Preview Placeholder */}
            <div className="pt-8 border-t border-slate-800">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Multi-Platform Distribution
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Telegram', icon: Send, color: 'text-sky-400 bg-sky-500/5 border-sky-500/20' },
                  { name: 'Discord', icon: MessageSquare, color: 'text-indigo-400 bg-indigo-500/5 border-indigo-500/20' },
                  { name: 'Reddit', icon: Share2, color: 'text-orange-400 bg-orange-500/5 border-orange-500/20' },
                ].map((plat) => (
                  <div key={plat.name} className={`p-4 rounded-2xl border ${plat.color} flex flex-col gap-2`}>
                    <div className="flex items-center justify-between">
                      <plat.icon className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">Queued</span>
                    </div>
                    <span className="text-sm font-bold">{plat.name} Post</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Published on {new Date(article.published_at).toLocaleString()}
            </span>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95">
              Copy Full Content <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ArticlePreviewModal;
