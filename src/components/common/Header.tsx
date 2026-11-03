import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGamification } from '../../context/GamificationContext';

const PAGE_TITLES: Record<string, string> = {
  '/missoes': 'Missões',
  '/conquistas': 'Conquistas',
  '/mapa': 'Mapa do Fundão',
  '/extensoes': 'Extensões & IC',
};

export const Header: React.FC = () => {
  const location = useLocation();
  const { currentRank, soundEnabled, toggleSound, openLevelModal } = useGamification();

  const currentTitle = PAGE_TITLES[location.pathname] || 'Calouro Quest';

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/50">
      <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm max-w-[800px] mx-auto">
        {/* Brand & Page Info */}
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <img
            alt="IC UFRJ Logo"
            className="h-8 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1W_IuotRg3PNakEcyNDEzPOzGWJDoptbuQxDQbztDfasGIwgZiEBckhJX-ynl1hs5BAJWqjhrJtWft-pXlwgvHW7nDb0vVHV4pV-TbOJ8jdZOEsE1hyzYzFoVmP03ego6G_r-7yODx32PYW8rcPNCtTLeXhCpZY4CGrUz1lTCN1g1UEJNT5B8vxwruIN_Ugmj2ClOS5GvNHf4gn8J6K8fJkiTJVXgbs3pN9ybAxqqlS8SekOe2IbMySBPUF"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-label-caps text-label-caps text-secondary uppercase truncate leading-none">
              IC · UFRJ
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold truncate leading-tight">
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-space-xs shrink-0">
          {/* Level Pill Button */}
          <button
            onClick={openLevelModal}
            title="Ver roadmap de patentes e níveis"
            className="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(245,158,11,0.25)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-tertiary text-[18px]">military_tech</span>
            <span className="font-label-caps text-label-caps text-tertiary font-bold">
              NV. {currentRank.level}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            aria-label={soundEnabled ? 'Desativar sons' : 'Ativar sons'}
            onClick={toggleSound}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Avatar Icon */}
          <div
            onClick={openLevelModal}
            title={currentRank.name}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};

