import React, { useState } from 'react';
import { Article } from '../types';
import { BentoCard } from './BentoCard';
import { X, Clock, Calendar, ChevronRight } from 'lucide-react';
 

interface ArticleListProps {
  articles: Article[];
  onBack: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles, onBack }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  

  const clearSelection = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="w-full max-w-4xl mx-auto animate-fadeIn">
        <button 
          onClick={clearSelection}
          className="mb-6 flex items-center text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronRight className="rotate-180 mr-1" size={20} /> Back to list
        </button>
        
        <div className="bg-neutral-900 rounded-3xl border border-white/5 overflow-hidden p-8 relative">
           {/* Abstract Header Gradient */}
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap gap-2 mb-6 mt-4">
                {selectedArticle.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 text-xs text-neutral-300 rounded-full border border-white/5">
                        {tag}
                    </span>
                ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-neutral-500 mb-8 border-b border-white/5 pb-8">
               <span className="flex items-center gap-2"><Calendar size={16}/> {selectedArticle.date}</span>
               <span className="flex items-center gap-2"><Clock size={16}/> {selectedArticle.readTime}</span>
            </div>

            

            {/* Content Body */}
            <div className="prose prose-invert prose-lg max-w-none text-neutral-400">
                <p className="whitespace-pre-line leading-relaxed">
                    {selectedArticle.content}
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Articles</h2>
        <button onClick={onBack} className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition">
            <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
            <BentoCard 
                key={article.id} 
                className="cursor-pointer group h-full hover:border-purple-500/30 transition-colors"
            >
                {/* Click handler wrapper since BentoCard href is optional/anchor */}
                <div onClick={() => setSelectedArticle(article)} className="h-full flex flex-col p-2">
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex gap-2 mb-4">
                            {article.tags.map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                            {article.title}
                        </h3>
                        <p className="text-neutral-500 text-sm line-clamp-3 mb-6 flex-1">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-neutral-600 font-medium border-t border-white/5 pt-4 mt-auto">
                            <span className="mr-3 flex items-center gap-1"><Calendar size={12}/> {article.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> {article.readTime}</span>
                        </div>
                    </div>
                </div>
            </BentoCard>
        ))}
      </div>
    </div>
  );
};
