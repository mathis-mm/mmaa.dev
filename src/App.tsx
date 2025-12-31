import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center relative overflow-hidden selection:bg-white selection:text-black">
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}
      />

      {/* Radial Gradient for Vignette/Focus */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Hello, I'm Mat.
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light mb-8">
          I'm a Full Stack Developer.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://github.com/mathis-mm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block p-3 rounded-full bg-neutral-900/50 border border-neutral-800 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="mailto:contact@mmaa.dev" 
            className="inline-block p-3 rounded-full bg-neutral-900/50 border border-neutral-800 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default App
