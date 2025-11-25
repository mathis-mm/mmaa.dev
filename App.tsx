
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowUpRight, Copy, Terminal, LayoutGrid, GitCommit, BookOpen, GitBranch } from 'lucide-react';
import { BentoCard } from './components/BentoCard';
import { ArticleList } from './components/ArticleList';
import { PROJECTS, STACK, SOCIALS, ARTICLES } from './constants';
import { ContentType } from './types';
import { fetchLatestActivity, GithubActivity } from './services/githubService';

function App() {
  const [time, setTime] = useState<string>('');
  const [view, setView] = useState<ContentType>(ContentType.HOME);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Featured Slide State
  const [activeSlide, setActiveSlide] = useState(0); // 0 = Article, 1 = Github
  const [latestCommit, setLatestCommit] = useState<GithubActivity | null>(null);
  const [gitLoading, setGitLoading] = useState(true);

  // Drag/Swipe Refs
  const dragStartRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  // Time effect for "Paris, FR" clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Paris'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch GitHub Activity
  useEffect(() => {
    fetchLatestActivity('mathis-mm').then(data => {
      if (data) setLatestCommit(data);
      setGitLoading(false);
    });
  }, []);

  // Slider Interval (30 seconds)
  // Depends on activeSlide so it resets timer on manual interaction
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 30000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@mmaa.dev');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // --- SWIPE / DRAG HANDLERS ---
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = false;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragStartRef.current = clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartRef.current === null) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartRef.current - clientX;
    
    // Threshold for swipe (50px)
    if (Math.abs(diff) > 50) {
      isDraggingRef.current = true; // Mark as drag so we don't trigger click events
      if (diff > 0) {
        // Swiped Left -> Next Slide (1)
        setActiveSlide(1);
      } else {
        // Swiped Right -> Prev Slide (0)
        setActiveSlide(0);
      }
    }
    
    dragStartRef.current = null;
  };

  const handleArticleClick = () => {
    // Only open article if we didn't just drag/swipe
    if (!isDraggingRef.current) {
      setView(ContentType.ARTICLES);
    }
  };

  // Helper for blinking colon logic
  const renderClock = () => {
    if (!time) return null;
    const parts = time.split(':');
    return (
      <>
        <span>{parts[0]}</span>
        <span className="animate-blink inline-block text-purple-500 mx-0.5">:</span>
        <span>{parts[1]}</span>
      </>
    );
  };

  const renderHome = () => {
    // Select a secondary project to display (e.g., the second one)
    const secondaryProject = PROJECTS[1];

    return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)] max-w-7xl mx-auto relative z-10">
      
      {/* 1. Featured Work Slider (Latest Article & Real GitHub Push) */}
      <BentoCard 
        className="md:col-span-2 md:row-span-2 min-h-[400px] group overflow-hidden select-none" 
        noPadding
      >
        {/* Slider Container with Drag Events */}
        <div 
          className="flex w-full h-full transition-transform duration-1000 ease-in-out cursor-grab active:cursor-grabbing" 
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* SLIDE 1: Article */}
          <div className="min-w-full h-full relative bg-neutral-900">
            <div 
              onClick={handleArticleClick}
              className="cursor-pointer absolute inset-0 z-0 hover:scale-105 transition-transform duration-700"
            >
               {/* Abstract background gradient instead of image */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-900 to-neutral-950" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-50" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 z-10 pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/20 backdrop-blur-sm uppercase tracking-wider">
                  Featured Read
                </div>
              </div>

              <div className="mt-auto pointer-events-auto">
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight max-w-md drop-shadow-xl">
                    {ARTICLES[0].title}
                  </h3>
                  <p className="text-neutral-300 text-sm line-clamp-2 max-w-sm drop-shadow-md mb-4">
                    {ARTICLES[0].excerpt}
                  </p>
                  <button onClick={handleArticleClick} className="text-xs text-white underline decoration-purple-500 underline-offset-4 hover:text-purple-300 transition-colors">
                    Read article
                  </button>
              </div>
            </div>
          </div>

          {/* SLIDE 2: GitHub Activity */}
          <div className="min-w-full h-full relative bg-[#0D1117] flex flex-col p-6 border-l border-white/5">
            {/* Github Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'radial-gradient(#30363d 1px, transparent 1px)', 
                backgroundSize: '20px 20px' 
            }}></div>

            <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
               <div className="flex justify-between items-start">
                  <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 backdrop-blur-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Latest Activity
                  </div>
               </div>

               <div className="flex-1 flex items-center justify-center pointer-events-auto">
                  <div className="w-full bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-2xl relative overflow-hidden">
                     {latestCommit ? (
                        <>
                           <div className="flex items-center gap-2 mb-3 text-neutral-400 text-xs">
                              <GitBranch size={14} />
                              <span className="font-mono">{latestCommit.repoName}</span>
                              <span className="mx-1 text-neutral-600">•</span>
                              <span className="bg-[#238636]/20 text-[#238636] px-1.5 py-0.5 rounded text-[10px] border border-[#238636]/30">{latestCommit.branch}</span>
                           </div>
                           <p className="text-white font-mono text-sm mb-4 line-clamp-3 leading-relaxed">
                              "{latestCommit.message}"
                           </p>
                           <div className="flex items-center justify-between pt-3 border-t border-[#30363d]">
                              <span className="text-xs text-neutral-500">{latestCommit.date}</span>
                              <a href={latestCommit.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-400 hover:underline">
                                 View on GitHub <ArrowUpRight size={12} />
                              </a>
                           </div>
                        </>
                     ) : (
                        <div className="text-center py-4">
                           {gitLoading ? (
                               <>
                                <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full mx-auto mb-2"/>
                                <p className="text-xs text-neutral-500">Fetching latest git data...</p>
                               </>
                           ) : (
                               <>
                                <p className="text-xs text-neutral-500 mb-2">No recent public activity found.</p>
                                <a href="https://github.com/mathis-mm" target="_blank" className="text-xs text-purple-400 hover:underline">
                                    View GitHub Profile
                                </a>
                               </>
                           )}
                        </div>
                     )}
                  </div>
               </div>
               
               <div className="text-right">
                  <p className="text-[10px] text-neutral-600 font-mono">
                    source: api.github.com
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 right-6 flex gap-2 z-20">
          <button onClick={() => setActiveSlide(0)} className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === 0 ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
          <button onClick={() => setActiveSlide(1)} className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === 1 ? 'w-8 bg-green-500' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
        </div>
      </BentoCard>

      {/* 2. Location & Time Card */}
      <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between group">
         <div>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               Base
            </div>
            <div className="flex items-center gap-2 text-neutral-300 mb-1">
                <MapPin size={16} />
                <span className="font-medium">Paris, FR</span>
            </div>
         </div>
         <div>
            <div className="text-4xl md:text-5xl font-bold text-white tracking-tight font-mono">
                {renderClock()}
            </div>
            <div className="text-xs text-neutral-500 mt-1">Local time</div>
         </div>
      </BentoCard>

      {/* 3. Stack Card - Infinite Scrolling */}
      <BentoCard className="md:col-span-1 md:row-span-1 overflow-hidden" noPadding>
        <div className="p-6 pb-0">
           <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
               <Terminal size={14} /> Tools
           </div>
           <h3 className="text-xl font-bold text-white mb-4">Stack</h3>
        </div>
        
        <div className="flex flex-col gap-3 pb-6 relative mask-image-gradient-sides">
            {/* Row 1: Left to Right (animate-scroll-right) */}
            <div className="flex w-max animate-scroll-right hover:[animation-play-state:paused]">
                {[...STACK, ...STACK].map((tech, i) => (
                    <div key={`l-${tech.name}-${i}`} className="mx-1 px-4 py-2 bg-neutral-800/50 text-sm text-neutral-200 rounded-xl border border-neutral-700/50 whitespace-nowrap hover:bg-neutral-700 hover:text-white transition-colors cursor-default flex items-center gap-3 group/icon">
                        <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain shrink-0" />
                        <span className="font-medium">{tech.name}</span>
                    </div>
                ))}
            </div>
            {/* Row 2: Right to Left (animate-scroll-left) */}
            <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
                {[...STACK].reverse().concat([...STACK].reverse()).map((tech, i) => (
                    <div key={`r-${tech.name}-${i}`} className="mx-1 px-4 py-2 bg-neutral-800/50 text-sm text-neutral-200 rounded-xl border border-neutral-700/50 whitespace-nowrap hover:bg-neutral-700 hover:text-white transition-colors cursor-default flex items-center gap-3 group/icon">
                        <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain shrink-0" />
                        <span className="font-medium">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </BentoCard>

      {/* 4. Small Project (Dynamic) */}
      <BentoCard className="md:col-span-1 md:row-span-1 relative group" href={secondaryProject?.link || '#'}>
         <div className="absolute top-4 right-4 text-neutral-600 group-hover:text-white transition-colors">
             <ArrowUpRight size={20} />
         </div>
         <div className="mt-auto">
             <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                 <LayoutGrid size={20} />
             </div>
             <h3 className="text-lg font-bold text-white mb-1">{secondaryProject?.title || 'Project'}</h3>
             <span className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded-full">
                 {secondaryProject?.tags[0] || 'Dev'}
             </span>
         </div>
      </BentoCard>

      {/* 5. Articles Entry Card */}
      <BentoCard 
        className="md:col-span-1 md:row-span-1 cursor-pointer bg-neutral-850 hover:bg-neutral-800"
      >
        <div onClick={() => setView(ContentType.ARTICLES)} className="h-full flex flex-col justify-between">
           <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span>Articles.</span>
              <span className="bg-white/10 text-white px-1.5 rounded">{ARTICLES.length}</span>
           </div>
           
           <div>
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mb-3 text-neutral-400">
                  <BookOpen size={18} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Read All</h3>
              <p className="text-xs text-neutral-400">
                 Explore the full collection of articles and notes.
              </p>
           </div>
        </div>
      </BentoCard>

      {/* 6. About / Quote */}
      <BentoCard className="md:col-span-2 md:row-span-1 flex flex-col justify-center bg-gradient-to-r from-neutral-900 to-neutral-850">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
           About
        </div>
        <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
          "Developer and cybersecurity explorer."
        </p>
      </BentoCard>

      {/* 7. Contact Card */}
      <BentoCard className="md:col-span-1 md:row-span-1">
         <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between">
               <div className="p-3 bg-neutral-800 rounded-full text-white">
                  <Copy size={18} onClick={handleCopyEmail} className="cursor-pointer hover:text-purple-400 transition" />
               </div>
               {copiedEmail && <span className="text-xs text-green-500 animate-pulse">Copied!</span>}
            </div>
            
            <div>
               <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">Contact</div>
               <h3 className="text-2xl font-bold text-white">Let's talk</h3>
               <a href="mailto:contact@mmaa.dev" className="text-neutral-400 text-sm hover:text-white transition mt-1 block">
                  contact@mmaa.dev
               </a>
            </div>
         </div>
      </BentoCard>

    </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 p-4 md:p-8 lg:p-12 font-sans selection:bg-purple-500/30">
      
      {/* Global Noise Texture */}
      <div className="bg-noise" />

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fadeIn relative z-10">
        <div>
          <h1 
            onClick={() => setView(ContentType.HOME)}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Mat<span className="text-purple-500">.</span>
          </h1>
          <p className="text-neutral-400 max-w-lg text-lg leading-relaxed">
            Full-stack developer, cyber enjoyer, and networking enthusiast.
          </p>
        </div>
        
        <div className="flex gap-4">
           {SOCIALS.map((social) => (
             <a 
               key={social.name}
               href={social.url}
               target="_blank"
               rel="noopener noreferrer"
               className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-all duration-300"
               aria-label={social.name}
             >
               <social.icon size={20} />
             </a>
           ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="transition-all duration-500 ease-in-out">
        {view === ContentType.HOME ? renderHome() : (
           <ArticleList 
             articles={ARTICLES} 
             onBack={() => setView(ContentType.HOME)} 
            />
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-24 pt-8 border-t border-neutral-900 flex justify-between items-center text-neutral-600 text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} Mat. All rights reserved.</p>
        <p>Design and build by Mat.</p>
      </footer>
    </div>
  );
}

export default App;
