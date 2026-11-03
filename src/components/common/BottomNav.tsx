import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/missoes', label: 'Missões', icon: 'assignment_turned_in' },
  { path: '/conquistas', label: 'Conquistas', icon: 'trophy' },
  { path: '/mapa', label: 'Mapa', icon: 'explore' },
  { path: '/extensoes', label: 'Extensões', icon: 'groups' },
];

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-surface-container-high/60 shadow-[0_-2px_12px_rgba(0,43,73,0.06)]">
      <div className="flex justify-around items-center h-20 px-space-xs max-w-[800px] mx-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] py-1 transition-all active:scale-95 ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="font-label-caps text-label-caps">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

