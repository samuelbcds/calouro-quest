import React from 'react';
import { Mission, MissionTag } from '../../types';
import { useGamification } from '../../context/GamificationContext';

interface MissionCardProps {
  mission: Mission;
}

const CATEGORY_LABELS: Record<string, { label: string; badgeClass: string }> = {
  fundao: { label: '🏛️ Fundão', badgeClass: 'bg-surface-container-high text-on-surface-variant' },
  ic: { label: '💻 IC', badgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant' },
  social: { label: '🤝 Social', badgeClass: 'bg-surface-container-high text-on-surface-variant' },
  extensoes: { label: '🚀 Extensões', badgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant' },
};

const getTagBadgeClass = (tag: MissionTag): string => {
  switch (tag) {
    case MissionTag.CRUCIAL:
      return 'bg-error-container text-on-error-container';
    case MissionTag.INTEGRACAO:
    case MissionTag.EXPLORACAO:
    case MissionTag.OPORTUNIDADE:
      return 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
    default:
      return 'bg-secondary-fixed text-on-secondary-fixed';
  }
};

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const { isMissionCompleted, toggleMission } = useGamification();
  const completed = isMissionCompleted(mission.id);

  const catMeta = CATEGORY_LABELS[mission.category] || {
    label: mission.category,
    badgeClass: 'bg-surface-container-high text-on-surface-variant',
  };

  return (
    <article className={`mission-card ${completed ? 'completed' : ''}`}>
      <div className="flex items-start justify-between gap-space-sm">
        <label className="flex items-start gap-space-sm cursor-pointer flex-1 min-w-0">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleMission(mission.id)}
            className="mission-chk mt-1 w-5 h-5 rounded cursor-pointer accent-secondary"
          />
          <div className="flex flex-col min-w-0">
            <span
              className={`mission-title font-body-bold text-body-bold leading-snug transition-colors ${
                completed ? 'line-through text-outline' : 'text-on-surface'
              }`}
            >
              {mission.title}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {mission.description}
            </span>
            {mission.codeSnippet && (
              <span className="font-code-snippet text-code-snippet text-secondary mt-1.5 bg-surface-container px-2 py-0.5 rounded w-fit">
                {mission.codeSnippet}
              </span>
            )}
          </div>
        </label>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span
            className={`px-2 py-0.5 rounded-full font-label-caps text-label-caps font-bold shadow-sm ${
              completed
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            +{mission.xp} XP
          </span>
          {mission.tag && (
            <span
              className={`px-2 py-0.5 rounded-full font-label-caps text-label-caps font-bold ${getTagBadgeClass(
                mission.tag
              )}`}
            >
              {mission.tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 text-on-surface-variant">
        <span className={`px-2 py-0.5 rounded-md font-label-caps text-label-caps ${catMeta.badgeClass}`}>
          {catMeta.label}
        </span>
        <span
          className={`status-indicator font-label-caps text-label-caps flex items-center gap-1 ${
            completed ? 'text-secondary font-bold' : 'text-outline font-normal'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {completed ? 'check_circle' : 'radio_button_unchecked'}
          </span>
          {completed ? 'Concluída' : 'Pendente'}
        </span>
      </div>
    </article>
  );
};
