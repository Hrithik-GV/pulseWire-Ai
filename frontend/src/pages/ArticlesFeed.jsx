import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import ArticlePreviewModal from '../components/ArticlePreviewModal';
import LoadingSpinner from '../components/LoadingSpinner';

const ArticlesFeed = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: articles, loading } = useApi(getArticles);

  if (loading) return <LoadingSpinner lg message="Synchronizing news database..." />;

  const filteredArticles = articles?.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-outfit">Intelligence Feed</h1>
          <p className="text-slate-400 mt-1">Generated articles from autonomous research</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search news intelligence..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-px">
        {['All Articles', 'Published', 'Drafts', 'Failed'].map((tab, i) => (
          <button 
            key={tab}
            className={`px-6 py-3 text-sm font-bold font-outfit uppercase tracking-widest transition-all relative ${
              i === 0 ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
            {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_#6366f1]" />}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredArticles?.length > 0 ? (
          filteredArticles.map(art => (
            <ArticleCard 
              key={art.id} 
              article={art} 
              onClick={setSelectedArticle} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass-card">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-white font-bold mb-1">No articles found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search query</p>
          </div>
        )}
      </div>

      <ArticlePreviewModal 
        article={selectedArticle} 
        isOpen={!!selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
};

export default ArticlesFeed;
