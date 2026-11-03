import React from 'react';
import { useGamification } from '../../context/GamificationContext';

export const GamificationHero: React.FC = () => {
  const {
    currentRank,
    nextRank,
    totalXP,
    totalMaxXP,
    progressPercentage,
    completedMissionsCount,
    totalMissionsCount,
    openLevelModal,
  } = useGamification();

  return (
    <section className="gamification-hero-card">
      {/* Decorative Blur Orbs */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary/30 blur-2xl pointer-events-none"></div>
      <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-tertiary-container/40 blur-xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col space-y-space-sm">
        {/* Upper row: Rank */}
        <div className="flex items-center justify-between">
          <button
            onClick={openLevelModal}
            className="flex items-center gap-space-xs text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-primary-container uppercase tracking-wider">
                Patente Calouro
              </span>
              <span className="font-headline-md text-headline-md text-white font-bold leading-tight flex items-center gap-1.5">
                Nível {currentRank.level}: {currentRank.name}
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                  verified
                </span>
              </span>
            </div>
          </button>
        </div>

        {/* XP Bar & Counter */}
        <div className="bg-surface-container-highest/15 rounded-lg p-space-sm backdrop-blur-sm space-y-1.5">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-1">
              <span className="font-headline-sm text-headline-sm font-bold text-tertiary-fixed">
                {totalXP}
              </span>
              <span className="font-body-sm text-body-sm text-on-primary-container">
                / {totalMaxXP} XP
              </span>
            </div>
            <span className="font-label-caps text-label-caps text-on-primary-container font-semibold">
              {progressPercentage}% Concluído
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-surface-container-highest/30 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-secondary-container rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(91,184,254,0.6)]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-white pt-1">
            <span className="font-body-sm text-body-sm text-on-primary-container flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              <span>
                {completedMissionsCount} de {totalMissionsCount} missões
              </span>
            </span>
            {nextRank && (
              <span className="font-label-caps text-label-caps text-tertiary-fixed flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">military_tech</span>
                Próx: {nextRank.name}
              </span>
            )}
          </div>
        </div>

        {/* LocalStorage Zero-Login Notice */}
        <div className="bg-surface-container-lowest/10 rounded-lg px-space-sm py-1.5 flex items-center gap-space-xs text-on-primary-container">
          <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">save</span>
          <p className="font-body-sm text-body-sm text-white/90 leading-snug">
            Progresso salvo automaticamente no seu navegador via{' '}
            <strong className="font-bold text-white">localStorage</strong> — sem necessidade de login!
          </p>
        </div>
      </div>
    </section>
  );
};
