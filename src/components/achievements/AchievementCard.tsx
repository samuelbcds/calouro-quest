import React from 'react';
import { Achievement } from '../../types';
import { useGamification } from '../../context/GamificationContext';

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { isAchievementUnlocked } = useGamification();
  const unlocked = isAchievementUnlocked(achievement);

  const getIconContainerClass = () => {
    if (!unlocked) return 'bg-surface-dim text-outline';
    if (achievement.variant === 'primary') return 'bg-primary-fixed text-on-primary-fixed shadow-primary/10';
    if (achievement.variant === 'secondary') return 'bg-secondary-fixed text-on-secondary-fixed shadow-secondary/10';
    if (achievement.variant === 'legendary') return 'bg-primary text-tertiary-fixed shadow-primary/20';
    return 'bg-tertiary-fixed text-on-tertiary-fixed shadow-tertiary-container/10';
  };

  const getStatusBadge = () => {
    if (unlocked) {
      const badgeColor =
        achievement.variant === 'secondary'
          ? 'bg-secondary-fixed text-on-secondary-fixed'
          : 'bg-tertiary-fixed text-on-tertiary-fixed';
      return (
        <span
          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-label-caps text-label-caps shrink-0 ${badgeColor}`}
        >
          <span className="material-symbols-outlined text-[13px]">check_circle</span> Concluído
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-label-caps text-label-caps bg-surface-variant text-on-surface-variant shrink-0">
        <span className="material-symbols-outlined text-[13px]">lock</span>{' '}
        {achievement.variant === 'legendary' ? 'Mestre' : 'Bloqueado'}
      </span>
    );
  };

  return (
    <div className={`badge-card ${unlocked ? 'unlocked' : 'locked'}`}>
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-xl shrink-0 shadow-md ${getIconContainerClass()}`}
      >
        <span
          className="material-symbols-outlined text-[30px]"
          style={unlocked ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {achievement.icon}
        </span>
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <h3
            className={`font-headline-sm text-headline-sm font-bold truncate ${
              unlocked ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            {achievement.title}
          </h3>
          {getStatusBadge()}
        </div>

        <p
          className={`font-body-sm text-body-sm mt-1 leading-snug ${
            unlocked ? 'text-on-surface-variant' : 'text-outline'
          }`}
        >
          {achievement.description}
        </p>

        {achievement.codeSnippet && unlocked && (
          <span className="font-code-snippet text-code-snippet text-secondary mt-1 bg-surface-container px-2 py-0.5 rounded w-fit">
            {achievement.codeSnippet}
          </span>
        )}

        <div className="mt-2 flex items-center justify-between">
          <span
            className={`font-label-caps text-label-caps flex items-center gap-1 ${
              unlocked ? 'text-tertiary font-bold' : 'text-on-surface-variant/70'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {unlocked ? 'local_fire_department' : 'travel_explore'}
            </span>
            {unlocked ? `+${achievement.xp} XP UFRJ` : `Requisito: ${achievement.hint}`}
          </span>
        </div>
      </div>
    </div>
  );
};
