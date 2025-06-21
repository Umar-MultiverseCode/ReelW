import React from 'react';

export const AnimatedHamburger = ({ open }: { open: boolean }) => (
  <div className="relative w-7 h-7 flex items-center justify-center">
    <span
      className={`absolute h-1 w-6 bg-cyan-400 rounded transition-all duration-300 ease-in-out
        ${open ? 'rotate-45 top-3.5' : 'top-2'}
        shadow-[0_0_8px_#22d3ee] group-hover:bg-cyan-300 group-hover:shadow-[0_0_12px_#22d3ee]`}
    />
    <span
      className={`absolute h-1 w-6 bg-cyan-400 rounded transition-all duration-300 ease-in-out
        ${open ? 'opacity-0' : 'top-3.5'}
        shadow-[0_0_8px_#22d3ee] group-hover:bg-cyan-300 group-hover:shadow-[0_0_12px_#22d3ee]`}
    />
    <span
      className={`absolute h-1 w-6 bg-cyan-400 rounded transition-all duration-300 ease-in-out
        ${open ? '-rotate-45 top-3.5' : 'top-5'}
        shadow-[0_0_8px_#22d3ee] group-hover:bg-cyan-300 group-hover:shadow-[0_0_12px_#22d3ee]`}
    />
  </div>
);

export default AnimatedHamburger; 