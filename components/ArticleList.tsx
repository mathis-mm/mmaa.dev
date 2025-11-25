
import React, { useState } from 'react';
import { Article } from '../types';
import { BentoCard } from './BentoCard';
import { X, Clock, Calendar, ChevronRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { PGP_PUBLIC_KEY } from '../constants';

interface ArticleListProps {
  articles: Article[];
  onBack: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles, onBack }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // PGP Modal State
  const [showPgp, setShowPgp] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);

  const clearSelection = () => {
    setSelectedArticle(null);
  };

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(PGP_PUBLIC_KEY);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  if (selectedArticle) {
    return (
      <div className="w-full max-w-4xl mx-auto animate-fadeIn relative">
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

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500 mb-8 border-b border-white/5 pb-8">
               <div className="flex items-center gap-6">
                 <span className="flex items-center gap-2"><Calendar size={16}/> {selectedArticle.date}</span>
                 <span className="flex items-center gap-2"><Clock size={16}/> {selectedArticle.readTime}</span>
               </div>
               
               <button 
                 onClick={() => setShowPgp(true)}
                 className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/20 text-green-400 border border-green-900/30 hover:bg-green-900/30 transition-colors text-xs font-medium cursor-pointer"
               >
                 <ShieldCheck size={14} /> Verified Author
               </button>
            </div>

            {/* Content Body */}
            <div className="prose prose-invert prose-lg max-w-none text-neutral-400">
                <p className="whitespace-pre-line leading-relaxed">
                    {selectedArticle.content}
                </p>
            </div>
          </div>
        </div>

        {/* PGP MODAL */}
        {showPgp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
             <div className="bg-neutral-900 border border-white/10 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
                <button 
                  onClick={() => setShowPgp(false)}
                  className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
                      <ShieldCheck size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-white">PGP Public Key</h3>
                      <p className="text-sm text-neutral-400">Fingerprint: O6Nx / 1O / mr</p>
                   </div>
                </div>

                <div className="relative group">
                   <div className="absolute top-2 right-2 z-10">
                      <button 
                        onClick={handleCopyPgp}
                        className="p-2 bg-neutral-800 text-neutral-400 hover:text-white rounded-lg border border-white/5 transition-colors flex items-center gap-2 text-xs"
                      >
                         {copiedPgp ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>}
                         {copiedPgp ? "Copied" : "Copy"}
                      </button>
                   </div>
                   <pre className="bg-neutral-950 p-4 rounded-xl text-[10px] md:text-xs text-neutral-400 font-mono overflow-auto max-h-[400px] border border-white/5 select-all scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                      {PGP_PUBLIC_KEY}
                   </pre>
                </div>

                <div className="mt-6 flex justify-end">
                   <button 
                      onClick={() => setShowPgp(false)}
                      className="px-4 py-2 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-colors"
                   >
                      Close
                   </button>
                </div>
             </div>
          </div>
        )}
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
