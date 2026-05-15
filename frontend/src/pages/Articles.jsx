import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  TrendingUp,
  Share2,
  Calendar,
  Layers,
  Eye
} from 'lucide-react';
import { articles } from '../data/mockData';
import { StatusBadge } from '../components/DashboardComponents';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Library</h1>
          <p className="text-muted-foreground mt-1">Explore all AI-generated reports, articles, and research briefings.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search library..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors border border-border">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredArticles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col"
          >
            <div className="p-6 flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-primary">
                  <Layers className="w-3.5 h-3.5" />
                  Full Report
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
              
              <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedArticle(article)}>
                {article.title}
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {article.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.sources.slice(0, 3).map(source => (
                  <span key={source} className="text-[10px] px-2 py-0.5 bg-secondary rounded-full font-medium text-muted-foreground border border-border/50">
                    {source}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-secondary/20 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {article.platforms.map(p => (
                    <div key={p} className="w-7 h-7 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-sm" title={p}>
                      <Share2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase">{article.platforms.length} Platforms</div>
              </div>
              
              <button 
                onClick={() => setSelectedArticle(article)}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:translate-x-1 transition-transform"
              >
                Read Now
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Article Preview Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="sticky top-0 p-6 border-b border-border bg-card/80 backdrop-blur-md z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusBadge status="success" />
                  <span className="text-xs text-muted-foreground font-mono">ID: {selectedArticle.id}</span>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <Filter className="w-5 h-5 rotate-45" /> {/* Close icon workaround */}
                </button>
              </div>
              
              <div className="p-8 md:p-12 overflow-y-auto space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">AI</div>
                      ContentGenie v4
                    </div>
                    <span>•</span>
                    <div>Published: {new Date(selectedArticle.publishedAt).toLocaleString()}</div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-xl text-muted-foreground leading-relaxed italic">
                    {selectedArticle.summary}
                  </p>
                  <div className="h-px bg-border my-8" />
                  <div className="space-y-6 text-foreground/80 leading-loose text-lg">
                    <p>This is a simulated preview of the AI-generated intelligence report. The autonomous agents have analyzed the following key themes and extracted high-fidelity insights from multiple verified sources.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
                      <h4 className="text-primary font-bold mb-3 uppercase tracking-wider text-xs">Primary Evidence Collected</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        {selectedArticle.sources.map(s => (
                          <li key={s} className="text-muted-foreground">Verified data stream from <strong>{s}</strong></li>
                        ))}
                      </ul>
                    </div>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-secondary/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{selectedArticle.reach}</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Impressions</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="text-lg font-bold">0.982</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Confidence</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
                  Export to PDF
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Articles;
