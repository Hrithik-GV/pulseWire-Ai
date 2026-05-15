import React from 'react';
import { Calendar, ChevronRight, Hash } from 'lucide-react';

const ArticleCard = ({ article, onClick }) => {
  return (
    <div 
      onClick={() => onClick(article)}
      className="glass-card p-5 glass-card-hover cursor-pointer group flex flex-col h-full"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          {article.sources?.slice(0, 2).map((source, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest font-bold text-indigo-400/80 px-2 py-0.5 rounded-md bg-indigo-500/5 border border-indigo-500/10">
              {source}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-3 leading-tight">
          {article.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
          {article.summary}
        </p>
      </div>
      
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(article.published_at).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1 text-indigo-400 font-medium text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
          Read Full <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
