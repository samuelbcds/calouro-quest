import React from 'react';
import { useGamification } from '../../context/GamificationContext';

export const TrophyOverview: React.FC = () => {
  const { unlockedAchievementsCount, totalAchievementsCount } = useGamification();

  const percentage = totalAchievementsCount > 0
    ? Math.round((unlockedAchievementsCount / totalAchievementsCount) * 100)
    : 0;

  const remaining = totalAchievementsCount - unlockedAchievementsCount;

  return (
    <div className="trophy-overview-card">
      <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
      <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-tertiary-fixed/15 blur-xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-md shadow-tertiary/20">
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-primary-container uppercase tracking-wider block">
                Progresso da Jornada
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                Mestre da Ilha do Fundão
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-display-lg-mobile text-display-lg-mobile font-extrabold text-tertiary-fixed">
              {percentage}%
            </span>
            <span className="font-label-caps text-label-caps text-on-primary-container">
              {unlockedAchievementsCount} de {totalAchievementsCount} Badges
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-dim/30 rounded-full h-3.5 p-0.5 mt-1 backdrop-blur-sm">
          <div
            className="bg-gradient-to-r from-tertiary-fixed to-secondary-container h-full rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-label-caps text-label-caps text-on-primary-container flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">verified</span>{' '}
            {unlockedAchievementsCount} Desbloqueadas
          </span>
          <span className="font-label-caps text-label-caps text-on-primary-container/80 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">lock</span>{' '}
            {remaining} Restantes
          </span>
        </div>
      </div>
    </div>
  );
};
