
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  href?: string;
  noPadding?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = "", 
  title, 
  subtitle,
  href,
  noPadding = false
}) => {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    // @ts-ignore
    <Wrapper 
      {...props}
      className={`group relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/10 transition-all duration-300 ease-out flex flex-col ${className}`}
    >
      {/* Glow Effect on Hover (Subtle gradient) */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className={`relative z-10 h-full ${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>

      {/* Optional Title Section (if passed prop) */}
      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-neutral-950/90 to-transparent">
          {subtitle && (
            <div className="text-xs font-medium tracking-wider text-neutral-400 uppercase mb-1">
              {subtitle}
            </div>
          )}
          <div className="flex items-center justify-between">
            {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
            {href && (
              <div className="p-2 rounded-full bg-white/10 text-white opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight size={18} />
              </div>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};
